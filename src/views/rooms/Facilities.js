import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { withTranslation } from 'react-i18next'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { useState, React } from 'react'
import { t } from 'i18next'
import Constants from 'src/common/Constants'
import APIPath from 'src/common/APIPath'
import { ApiRequest } from 'src/common/ApiRequest'

const Facilities = () => {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const changeName = (e) => {
    setName(e.target.value)
  }

  const saveOK = async () => {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)

    let url = APIPath.facilities
    let obj = { url: url, method: 'post', formData }
    let response = await ApiRequest(obj)
    // setLoading(false)
    if (response.flag === false) {
      // setSuccess([])
      // setError(response.message)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } else {
      // let status = response.data.message
      // setSuccess([status])
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setName('')
      setFile(null)
    }
  }

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>
        <CIcon icon={cilPlus} className="me-2" /> {t('New')}
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>{t('New Facility')}</CModalTitle>
        </CModalHeader>
        <CForm>
          <CModalBody>
            <div className="mb-3">
              <CFormLabel htmlFor="facilityName">{t('Name')}</CFormLabel>
              <CFormInput type="name" id="facilityName" onChange={changeName} />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">{t('Image')}</CFormLabel>
              <CFormInput type="file" id="formFile" onChange={selectFile} />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              {t('Close')}
            </CButton>
            <CButton color="primary" onClick={saveOK}>
              {t('Save')}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>

      <CTable hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Class</CTableHeaderCell>
            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Mark</CTableDataCell>
            <CTableDataCell>Otto</CTableDataCell>
            <CTableDataCell>@mdo</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jacob</CTableDataCell>
            <CTableDataCell>Thornton</CTableDataCell>
            <CTableDataCell>@fat</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
            <CTableDataCell>@twitter</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default withTranslation()(Facilities)
