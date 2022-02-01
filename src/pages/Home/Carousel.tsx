import React, { useRef, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import SnapCarousel, {
	Pagination,
	ParallaxImage,
	AdditionalParallaxProps,
} from 'react-native-snap-carousel'

import { viewportWidth, wp } from '@/utils/index'

const data = [
	'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/43/static/media/react-native-logo.79778b9e.png',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAApCAMAAAA4Y0Y/AAAAbFBMVEVIZ6r///9FZan5+vw1WqQ6XaZBYqg9X6cyWKMtVaLw8ffq7fTl6PLK0eNnfrYpU6FddrK/x95XcrCYpsuHmMORoMjX3OrQ1ubFzOG3wNrd4e2os9JRba2hrc+Bk8Gxu9d2irwcTJ4ORpxuhLlApouHAAADVklEQVRYhe2V2bKjOAyGwXsMwSwBwpKQdN7/HVu/WPp0T5LD1HTV3EQXgLGsz5IlOYo+8pGPfOQ/ivg3unuVv1fUZhx3GnPK7FNUpPgeLKKjjOP4tMegSb1M1R5s76W3b1Wcj+O9XEuKqduheCBXvH6nYer4f+HagmxV97Dr3P4iVx/JVr4zSf8e1x7ALbUlslFIV2Mt+y6sck7z5/Y1c0lPr+Exm9KyRMHSxiVj9plPZTelZKubuky4uk2bOlymabCRcI+uSfszHbuNhpa+rk7M3B9Vkx5P7LUxF0zVjm27jJY0XeY2rj1NU3f9J1hk8SqZ7vld0Mu7yDTrf7UkXtxb5vYtj1ryxp6WKZ+Ty+q8jI5q4YoRwycN5AvXFMsHrUicWrE+XPmFYjsrG/+SyZrbNpAiUsU2OquZ65pXhZIXXQInu05gwZBdAUgODKuyrKoOOIdHCAO9Ruamt0fHO3WYKrIbAjXpHP/qrEYTygK4Dlaap2kobEB0RuUQsnMQ9gHuHXuvlRDGlgjc3dqArSuOmxEBsb4hin0QxnBcsLFKCT6W6Q4u4PH4olSWOrJYVlNIHHPhAieiwD6aYRguZGTgyQPlUwUI3KEUjBxrH2eIwEbbH6SdIirVq2b5lXv6jXvggPw6w4WL+uUmVyFEF7LLyWAQAraIjYILb5PwAvuG6zaunCW+bNzqK5fTx4KLa21cuSksX1/1wYXLHgyabifm4mdGS4RBuhROkBjDdRSTCwohvKIYzrSLQLkoHX7dqO1gowWfL7SleX++XFGyDJwxSYA/iTgEk2lEzCitDzYTzO3ugctvVJJT/Y5QtVwCqQ4aSX7ifGYrxYtrc+3PCvrxfCcmzkh++7i/T/hqi2MaN0v9Stai0cBLWJXaXcJL+LHUb+AafB7plbu2EJ8y97HmUrS1EModcOd2RbGhvR7XmYpOqJTxNrX0KxyS1E8jbQvvJe4jkwPQR633vYrMWMAr2ZZCVRwKmU7CeO+nDMO2hBuqxrdsHrh6jOiwxBfUGF1CVmykBzI+PC8lq/V8YQkV5aMSNIai0HbMS4PToUeel8LRbUG6xqgxF2p2gqbKch2QqTEfZ2t6tgrj39/sf3Zwsf0Q4re5r4M/Zr6FfOQjH/nIfvkJaaIsEa/B1HwAAAAASUVORK5CYII=',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
]

const sliderWidth = viewportWidth
const sideWidth = wp(90)

const itemWidth = sideWidth + wp(2) * 2

const Carousel1 = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const renderItem = (
		{ item }: { item: string },
		parallaxProps?: AdditionalParallaxProps,
	) => {
		return (
			<ParallaxImage
				style={{ height: '100%', width: itemWidth }}
				containerStyle={{
					...StyleSheet.absoluteFillObject,
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
		borderColor: 'red',
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