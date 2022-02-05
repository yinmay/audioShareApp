module.exports = {
	root: true,
	globals: { wx: true },
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: '@react-native-community',
	// required to lint *.wpy files
	plugins: ['html'],
	settings: {
		'html/html-extensions': ['.html', '.wpy'],
	},
	// add your custom rules here
	rules: {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'space-before-function-paren': 0,
		//关闭行末分号提示/报错
		semi: 0,
		//关闭定义变量未使用提示/报错
		'no-unused-vars': 0,
	},
}
