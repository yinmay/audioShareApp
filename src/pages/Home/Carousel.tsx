import React, { useRef, useState, FC } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import SnapCarousel, {
	Pagination,
	ParallaxImage,
	AdditionalParallaxProps,
} from 'react-native-snap-carousel'

import { viewportWidth, wp } from '@/utils/index'

const sliderWidth = viewportWidth
const sideWidth = wp(90)

const itemWidth = sideWidth + wp(2) * 2

interface IProps {
	data: string[]
}

const Carousel1: FC<IProps> = ({ data }) => {
	console.log(data)
	const [activeIndex, setActiveIndex] = useState(0)
	const renderItem = (
		{ item }: { item: string },
		parallaxProps?: AdditionalParallaxProps,
	) => {
		return (
			<ParallaxImage
				style={{ height: '50%', width: itemWidth }}
				containerStyle={{
					height: 200,
					// ...StyleSheet.absoluteFillObject,
					resizeMode: 'cover',
				}}
				source={{
					uri: item,
				}}
				{...parallaxProps}
			/>
		)
	}
	const onSnapToItem = (index: number) => {
		setActiveIndex(index)
	}

	const ref = useRef(null)
	const getPage = () => {
		return (
			<View style={styles.paginationWrapper}>
				<Pagination
					dotsLength={data.length}
					activeDotIndex={activeIndex}
					containerStyle={styles.paginationContainer}
					dotContainerStyle={styles.dotContainer}
					dotColor={'rgba(255, 255, 255, 0.92)'}
					dotStyle={styles.paginationDot}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
				/>
			</View>
		)
	}
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'rebeccapurple',
				paddingTop: 50,
			}}>
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<SnapCarousel
					onSnapToItem={onSnapToItem}
					data={data}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					renderItem={renderItem}
					hasParallaxImages
					loop
					autoplay
				/>
			</View>
			<View>{getPage()}</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 400,
		height: 200,
		borderWidth: 3,
	},
	paginationContainer: {
		position: 'absolute',
		height: 16,
		paddingVertical: 0,
		borderRadius: 8,
		top: -30,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},
	paginationWrapper: {
		alignContent: 'center',
		alignItems: 'center',
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 0,
		backgroundColor: 'rgba(255,255,255,1)',
	},
	dotContainer: {},
})

export default Carousel1
