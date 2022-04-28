import { createElement } from 'react'
import { I18nContext } from './context'

// eslint-disable-next-line react/prop-types
export function I18nextProvider({ i18n, defaultNS, children }) {
  return createElement(
    I18nContext.Provider,
    {
      value: {
        i18n,
        defaultNS,
      },
    },
    children,
  )
}
