'use client'

import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { errorMessageVariants, incompleteSignersListVariants, incompleteSignerItemVariants, signerNameVariants, missingFieldsVariants } from '../Elavtal.variants'
import { IncompleteSigner } from '../hooks/useDocumentAnalysis'


interface StatusMessageProps {
  uploadError: string | null
  incompleteSigners: IncompleteSigner[] | null
}

export const StatusMessage = ({ uploadError, incompleteSigners }: StatusMessageProps) => {
  const { t } = useTranslation('elavtal')

  const errorClasses = errorMessageVariants()
  const incompleteSignersListClasses = incompleteSignersListVariants()
  const incompleteSignerItemClasses = incompleteSignerItemVariants()
  const signerNameClasses = signerNameVariants()
  const missingFieldsClasses = missingFieldsVariants()

  return (
    <>
      {uploadError && (
        <div className={errorClasses} role="alert" aria-live="polite">
          {uploadError}
          {incompleteSigners && incompleteSigners.length > 0 && (
            <div className={incompleteSignersListClasses}>
              {incompleteSigners.map((signer, index) => (
                <div key={index} className={incompleteSignerItemClasses}>
                  <span className={signerNameClasses}>{signer.name}</span>
                  <span className={missingFieldsClasses}>{signer.missingFields.map((field) => t(`missing_${field}`)).join(', ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
