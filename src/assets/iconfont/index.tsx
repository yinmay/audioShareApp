/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react'
import { ViewProps } from 'react-native'
import { GProps } from 'react-native-svg'
import IconRnAppnew from './IconRnAppnew'
import IconRnAppaccountfilling from './IconRnAppaccountfilling'
import IconRnAppaccount from './IconRnAppaccount'
import IconRnApphomeFilling from './IconRnApphomeFilling'
import IconRnAppstar from './IconRnAppstar'
import IconRnAppstarFill from './IconRnAppstarFill'
import IconRnApphome from './IconRnApphome'

export type IconNames =
	| 'icon-rnAppnew'
	| 'icon-rnAppaccountfilling'
	| 'icon-rnAppaccount'
	| 'icon-rnApphome-filling'
	| 'icon-rnAppstar'
	| 'icon-rnAppstar-fill'
	| 'icon-rnApphome'

interface Props extends GProps, ViewProps {
	name: IconNames
	size?: number
	color?: string | string[]
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
	switch (name) {
		case 'icon-rnAppnew':
			return <IconRnAppnew key="1" {...rest} />
		case 'icon-rnAppaccountfilling':
			return <IconRnAppaccountfilling key="2" {...rest} />
		case 'icon-rnAppaccount':
			return <IconRnAppaccount key="3" {...rest} />
		case 'icon-rnApphome-filling':
			return <IconRnApphomeFilling key="4" {...rest} />
		case 'icon-rnAppstar':
			return <IconRnAppstar key="5" {...rest} />
		case 'icon-rnAppstar-fill':
			return <IconRnAppstarFill key="6" {...rest} />
		case 'icon-rnApphome':
			return <IconRnApphome key="7" {...rest} />
	}

	return null
}

IconFont = React.memo ? React.memo(IconFont) : IconFont

export default IconFont
