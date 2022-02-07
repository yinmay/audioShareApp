import React, { FC, useState } from 'react'
import {
	StyleSheet,
	Animated,
	Text,
	Easing,
	View,
	Platform,
} from 'react-native'
import Icon from '@/assets/iconfont/index'
import Slider from 'react-native-slider-x'
import Touchable from '@/components/Touchable'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import Thumb from './Thumb'

const mapStateToProps = ({ player, loading }: RootState) => ({
	playState: player.playState,
	playSeconds: player.playSeconds,
	duration: player.duration,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {}

/**
 * 循环动画
 */
class LoopView extends React.PureComponent {
	spin: Animated.CompositeAnimation
	anim = new Animated.Value(0)
	constructor(props: IProps) {
		super(props)
		this.spin = Animated.loop(
			Animated.timing(this.anim, {
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
				useNativeDriver: true,
			}),
			{ iterations: -1 },
		)
	}

	componentDidMount() {
		this.spin.start()
	}

	render() {
		const rotate = this.anim.interpolate({
			inputRange: [0, 1], //输入值
			outputRange: ['0deg', '360deg'], //输出值
		})
		const { children } = this.props
		return (
			<Animated.View
				style={{
					transform: [{ rotate }],
				}}>
				{children}
			</Animated.View>
		)
	}
}

/**
 * 播放条
 */
const PlayBar: FC<IProps> = props => {
	const { dispatch } = props

	const [currentTime, useCurrentTime] = useState(0)

	const onSliderEditStart = () => {
		dispatch({
			type: 'player/timer-end',
		})
	}
	const onSliderEditEnd = () => {
		dispatch({
			type: 'player/changeCurrentTime',
		})
	}
	const onSliderEditing = (value: number) => {
		dispatch({
			type: 'player/setState',
			payload: {
				playSeconds: value,
			},
		})
	}

	const pause = () => {
		dispatch({
			type: 'player/pause',
		})
	}

	const play = () => {
		dispatch({
			type: 'player/play',
		})
	}

	const renderThumb = () => {
		return <Thumb currentTime={currentTime} />
	}

	const { playState, playSeconds, duration } = props
	console.log(playState)
	return (
		<View>
			<View style={styles.container}>
				<Slider
					onSlidingStart={onSliderEditStart}
					onSlidingComplete={onSliderEditEnd}
					onValueChange={onSliderEditing}
					value={playSeconds}
					maximumValue={duration < 0 ? 100 : duration}
					maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
					minimumTrackTintColor="white"
					thumbTintColor="white"
					thumbStyle={styles.thumb}
					renderThumb={renderThumb}
					style={styles.slider}
				/>
			</View>
			<View style={styles.control}>
				{/* {playState === 'playing' && ( */}
				<Touchable onPress={pause} style={styles.button}>
					<Text>start</Text>
					{/* <Icon name="icon-rnAppstart" size={40} color="#fff" /> */}
				</Touchable>
				{/* )} */}
				{/* {(playState === 'paused' || playState === 'finish') && ( */}
				<Touchable onPress={play} style={styles.button}>
					{/* <Icon name="icon-bofang" size={40} color="#fff" /> */}
					<Text>paused</Text>
				</Touchable>
				{/* )} */}
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		marginVertical: 15,
		marginHorizontal: 15,
		flexDirection: 'row',
	},
	control: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 15,
		marginHorizontal: 90,
	},
	slider: {
		flex: 1,
		alignSelf: 'center',
		marginHorizontal: Platform.select({ ios: 5 }),
	},
	thumb: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 76,
		height: 20,
	},
	button: {
		marginHorizontal: 10,
	},
})

export default connect(mapStateToProps)(PlayBar)
