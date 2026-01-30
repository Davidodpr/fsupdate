'use client'

import React, { useContext, createContext, useEffect, HTMLAttributes, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { EXPERIMENT_VARIANTS } from '@/constants/experiments'


const defaultValue: EvidentlyContextType = {
  variant: null,
  secondaryVariant: null,
  setVariant: () => null,
  setSecondaryVariant: () => null,
  sendEvidentlyEvent: () => null,
  isLoadingExperimentVariant: true,
}

type EvidentlyContextType = {
  variant: string | null
  secondaryVariant: string | null
  sendEvidentlyEvent: (detailsData: Record<string, number>) => void
  isLoadingExperimentVariant: boolean
  setVariant: (variant: string) => void
  setSecondaryVariant: (variant: string) => void
}

type CombinationDiscountFeature = 'combinationDiscountStage' | 'combinationDiscountProduction'

export type Feature = CombinationDiscountFeature
const CombinationDiscountVariants = [EXPERIMENT_VARIANTS.combinationDiscount.withDiscount, EXPERIMENT_VARIANTS.combinationDiscount.withoutDiscount] as const

export type EvidentlyContextProviderProps = {
  valueType: 'string' | 'number' | 'boolean'
  feature: Feature | undefined
  secondaryFeature?: Feature | undefined
  entityId: string
} & HTMLAttributes<HTMLDivElement>

const EvidentlyContext = createContext<EvidentlyContextType>(defaultValue)
const CURRENTPROJECT = 'Flyttsmart'

export const EvidentlyProvider = ({ children, entityId, valueType, feature, secondaryFeature }: EvidentlyContextProviderProps) => {
  const [variant, setVariant] = useState<string | null>(null)
  const [secondaryVariant, setSecondaryVariant] = useState<string | null>(null)
  const [isLoadingExperimentVariant, setIsLoadingExperimentVariant] = useState<boolean>(true)
  const [evidentlyId, setEvidentlyId] = useState<string | null>()
  const variantQuery = useSearchParams().get('variant')
  const secondaryVariantQuery = useSearchParams().get('secondaryVariant')

  useEffect(() => {
    if (!evidentlyId) setEvidentlyId(entityId)
  }, [entityId, evidentlyId])

  const sendEvidentlyEvent = async (detailsData: Record<string, number>) => {
    fetch('/api/sendEvidentlyEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ detailsData, evidentlyId, currentProject: CURRENTPROJECT }),
      cache: 'no-store',
    })
  }
  const doEvaluateEvidentlyFeature = useCallback(
    async (setVariantParam: (variant: string) => void, featureParam: Feature) => {
      const evaluateFeatureRequest = {
        entityId: evidentlyId ?? '',
        feature: featureParam,
        project: CURRENTPROJECT,
      }

      const isCombinationDiscountFeature = (featureVariant: string): featureVariant is CombinationDiscountFeature => CombinationDiscountVariants.includes(featureVariant)

      try {
        const response = await fetch('/api/evaluateEvidentlyFeature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(evaluateFeatureRequest),
          cache: 'no-store',
        })
        const data = await response.json()
        if (valueType === 'string') {
          if (!!data?.value?.stringValue) {
            const stringValue = data.value.stringValue
            if (isCombinationDiscountFeature(stringValue)) setVariantParam(stringValue)
          }
        }
      } catch (error: unknown) {
        console.error(error)
      }
      setIsLoadingExperimentVariant(false)
    },
    [evidentlyId, valueType],
  )

  useEffect(() => {
    // Force AB Variant by query param
    if (typeof variantQuery === 'string' && variantQuery) return setVariant(variantQuery)

    if (evidentlyId && feature) {
      // Otherwise use Evidently experiment variant
      doEvaluateEvidentlyFeature(setVariant, feature)
    }
  }, [evidentlyId, feature, doEvaluateEvidentlyFeature, variantQuery])

  useEffect(() => {
    // Force AB Variant by query param
    if (typeof secondaryVariantQuery === 'string' && secondaryVariantQuery) return setSecondaryVariant(secondaryVariantQuery)

    if (evidentlyId && secondaryFeature) {
      // Otherwise use Evidently experiment variant
      doEvaluateEvidentlyFeature(setSecondaryVariant, secondaryFeature)
    }
  }, [doEvaluateEvidentlyFeature, secondaryFeature, evidentlyId, secondaryVariantQuery])

  const contextValue: EvidentlyContextType = { variant, sendEvidentlyEvent, isLoadingExperimentVariant, setVariant, secondaryVariant, setSecondaryVariant }
  return <EvidentlyContext.Provider value={contextValue}>{children}</EvidentlyContext.Provider>
}

export const useEvidentlyContext = () => {
  const context = useContext(EvidentlyContext)
  if (context === undefined) {
    throw new Error('useEvidentlyContext must be used within an EvidentlyContext')
  }
  return context
}
