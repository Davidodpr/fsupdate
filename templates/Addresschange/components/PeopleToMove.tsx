import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import Checkbox from '@/components/atoms/Checkbox'
import Text from '@/components/atoms/Text'
import InfoBoxColored from '@/components/molecules/InfoBoxColored'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import { checkboxLabelVariants, checkboxWrapperVariants, infoBoxWrapperDivVariants, wrapperVariants } from '../AddresschangePage.variants'

export const PeopleToMove = () => {
  const { t } = useTranslation('addresschange')
  const { contract, personsAtCurrentAddress, setContract } = useAddresschangeContext()
  const {
    user: { profile },
  } = useUserContext()
  const [peopleToMoveInfo, setPeopleToMoveInfo] = useState<Record<string, string>>({ type: '', message: '' })
  const [showModal, setShowModal] = useState<boolean>(false)
  const isPersonIncludedInMove = (pno: string) => contract.peopleToMove?.map((person) => person?.pno)?.includes(pno)

  const handlePerson = (person: SkatteverketPersonToMove) => {
    let updated = [...contract.peopleToMove]

    if (isPersonIncludedInMove(person.pno)) {
      updated = contract.peopleToMove?.filter((personToMove) => personToMove?.pno !== person?.pno)
    } else {
      updated.push(person)
    }

    setContract({ ...contract, peopleToMove: updated })
  }

  const validatePeopleToMove = () => {
    const children = personsAtCurrentAddress?.filter((person) => person?.isUnderage)
    const childrenPnos = children.map((child) => child?.pno)
    const allChildrenAreIncluded = childrenPnos.every((child) => isPersonIncludedInMove(child))
    const oneOrMoreChildAreIncluded = childrenPnos.some((child) => isPersonIncludedInMove(child))
    const oneOrMoreGuardianAreIncluded = contract.peopleToMove?.map((person) => person?.pno)?.some((person) => childrenPnos.includes(person))
    const allGuardiansAreIncluded = children
      .flatMap((child) => child?.guardians)
      .map((guardian) => guardian?.pno)
      .every((guardian) => isPersonIncludedInMove(guardian ? guardian : ''))

    // No one is marked at all, this is treated as an error, ie user can't continue in flow
    if (!contract.peopleToMove?.length || !contract.peopleToMove?.filter((x) => x)?.length) {
      setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.noOneIsIncludedInMove') })
      return
    }

    if (isPersonIncludedInMove(profile.pno)) {
      // User and children are included but not other guardian(s)
      if (oneOrMoreChildAreIncluded && !allGuardiansAreIncluded) {
        setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.allGuardiansAreNotIncludedInMove') })
        return
      }

      // User is included in move but no children
      if (!allChildrenAreIncluded) {
        setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.childrenAreNotIncludedInMove') })
        return
      }
    }

    if (!isPersonIncludedInMove(profile.pno)) {
      if (oneOrMoreChildAreIncluded) {
        // Only children are included in move
        if (contract.peopleToMove?.every((person) => person?.isUnderage)) {
          setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.onlyChildrenAreIncludedInMove') })
          return
        }

        // Everyone but you are included
        if (oneOrMoreGuardianAreIncluded) {
          setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.youAreNotIncludedInMove') })
          return
        }
      }

      // Only other guardian(s) are included
      if (!allChildrenAreIncluded) {
        setPeopleToMoveInfo({ type: 'warning', message: t('ADDRESS.onlyOtherGuardianIsIncludedInMove') })
        return
      }
    }

    setPeopleToMoveInfo({ type: '', message: '' })
  }

  useEffect(() => {
    validatePeopleToMove()
  }, [contract.peopleToMove])

  useEffect(() => {
    // Preselect the user in list of people available for move the first time user visits step
    const user = personsAtCurrentAddress?.find((person) => person.pno === profile.pno)

    if (user && !isPersonIncludedInMove(user.pno)) {
      setContract({ ...contract, peopleToMove: [...contract.peopleToMove, user] })
    }
  }, [contract.newAddress])

  return (
    <>
      <Text variant={'bodyBold'} style={{ margin: '5px 0' }}>
        {t('ADDRESS.personsMoving')}
      </Text>
      <Text style={{ margin: '5px 0' }}>{t('ADDRESS.personsMovingIntro')}</Text>
      <Text style={{ margin: '5px 0 10px' }}>
        <a
          href=""
          style={{ fontWeight: 'bold' }}
          onClick={(e) => {
            e.preventDefault()
            setShowModal(true)
          }}
        >
          {t('faqLink')}
        </a>
      </Text>
      <Modal open={showModal}>
        <ModalContent setShowModal={setShowModal} withCloseButton={true}>
          <div className={wrapperVariants()}>
            <Text style={{ borderBottom: '1px solid rgb(238, 238, 240)', paddingBottom: '15px' }} spacing="less" variant={'extraLargeBold'}>
              {t('common:FAQHeader')}
            </Text>
            <div dangerouslySetInnerHTML={{ __html: t('addresschange:ADDRESS.personsMovingModal') }} />
          </div>
        </ModalContent>
      </Modal>
      {personsAtCurrentAddress?.map((person) => (
        <>
          <div className={checkboxWrapperVariants()}>
            <Checkbox
              onChange={() => handlePerson(person)}
              checked={isPersonIncludedInMove(person.pno)}
              label={
                <div className={checkboxLabelVariants()}>
                  {person?.name} {person?.pno}
                </div>
              }
            />
          </div>
        </>
      ))}
      {peopleToMoveInfo.type && (
        <InfoBoxColored
          showIcon
          textAlign="left"
          color={peopleToMoveInfo?.type === 'warning' ? 'red' : 'green'}
          type={peopleToMoveInfo.type as 'error' | 'info' | 'success' | 'warning' | undefined}
        >
          {<div className={infoBoxWrapperDivVariants()} dangerouslySetInnerHTML={{ __html: peopleToMoveInfo.message }}></div>}
        </InfoBoxColored>
      )}
    </>
  )
}
