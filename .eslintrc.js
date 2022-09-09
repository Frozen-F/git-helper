module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020, // 指定js版本
    sourceType: 'module' // 默认为script，使用es6 module设置为module
  },
  plugins: [ // 插件
    '@typescript-eslint'
  ],
  extends: [], // 集成的代码规范
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型报错
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }], // if while function 后面的{必须与if在同一行，java风格。
    'camelcase': [1, { 'properties': 'always' }], //强制驼峰法命名
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [1, 'never'],
    'comma-spacing': [2, { 'before': false, 'after': true }], // 控制逗号前后的空格
    'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现
    'constructor-super': 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
    'eol-last': 2, // 文件末尾强制换行
    'eqeqeq': [2, 'allow-null'], // 使用 === 替代 ==
    'handle-callback-err': 0, // nodejs 处理错误
    'indent': [2, 2, { 'SwitchCase': 1 }], // 缩进风格
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], //对象字面量中冒号的后空格
    'keyword-spacing': [2, { 'before': true, 'after': true }],
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 2, //new时必须加小括号
    'no-array-constructor': 2, //禁止使用数组构造器
    'no-console': 0, //禁止使用console
    'no-class-assign': 2, //禁止给类赋值
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-control-regex': 0, //禁止在正则表达式中使用控制字符
    'no-delete-var': 2, //不能对var声明的变量使用delete操作符
    'no-dupe-args': 2, //函数参数不能重复
    'no-dupe-class-members': 2, //不允许类中出现重复的声明
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-empty-character-class': 0, //正则表达式中的[]内容不能为空
    'no-empty-pattern': 0, // 禁止使用空解构模式
    'no-eval': 0, //禁止使用eval
    'no-ex-assign': 2, //禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, //禁止扩展native对象
    'no-extra-bind': 2, //禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, //禁止不必要的bool转换
    'no-extra-parens': [2, 'functions'], //禁止非必要的括号
    'no-fallthrough': 2, //禁止switch穿透
    'no-floating-decimal': 2, //禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, //禁止重复的函数声明
    'no-inner-declarations': [2, 'functions'], //禁止在块语句中使用声明（变量或函数）
    'no-invalid-regexp': 2, //禁止无效的正则表达式
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'no-iterator': 2, //禁止使用__iterator__ 属性
    'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }], //禁止标签声明，会令开发中感到困惑。
    'no-lone-blocks': 2, //禁止不必要的嵌套块
    'no-multi-spaces': 2, //不能用多余的空格
    'no-multiple-empty-lines': [0, { 'max': 2 }], //空行最多不能超过2行
    'no-new-wrappers': 2, //禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 0, //不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 2, //禁止使用八进制数字
    'no-octal-escape': 2, //禁止使用八进制转义序列
    'no-redeclare': 2, //禁止重复声明变量
    'no-regex-spaces': 2, //禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-return-assign': [2, 'except-parens'], //return 语句中不能有赋值表达式
    'no-self-assign': 2, //自我分配
    'no-self-compare': 2, //不能比较自身
    'no-sequences': 2, //禁止使用逗号运算符
    'no-shadow-restricted-names': 2, //严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-sparse-arrays': 2, //禁止稀疏数组， [1,,2]
    'no-this-before-super': 2, //在调用super()之前不能使用this或super
    'no-trailing-spaces': 0, //一行结束后面不要有空格
    'no-undef': 0, //不能有未定义的变量
    'no-unneeded-ternary': 0, //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'no-unreachable': 2, //不能有无法执行的代码
    'no-unsafe-finally': 0, // 禁止在 finally 语句块中出现控制流语句
    // 'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }], // 不能有声明后未被使用的变量或参数
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-useless-constructor': 2, //可以在不改变类的工作方式的情况下安全地移除的类构造函数
    'no-useless-escape': 0,
    'no-whitespace-before-property': 0,
    'one-var': 0, //连续声明
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' }}], //换行时运算符在行尾还是行首
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }], //引号类型 `` "" ''
    'semi': [2], //语句强制分号结尾
    'semi-spacing': [2, { 'before': false, 'after': true }], //分号前后空格
    'space-before-blocks': [2, 'always'], //不以新行开始的块{前面要不要有空格
    'space-in-parens': [2, 'never'], //小括号里面要不要有空格
    'space-infix-ops': 2, //中缀操作符周围要不要有空格
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }], //一元运算符的前/后要不要加空格
    'spaced-comment': 0, //注释风格不要有空格什么的
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2, //必须使用合法的typeof的值
    'wrap-iife': [2, 'any'], //立即执行函数表达式的小括号风格
    'yield-star-spacing': 0,
    'yoda': [2, 'never'], //禁止尤达条件
    'no-debugger': 0, //禁止使用debugger
    'object-curly-spacing': [2, 'always', { objectsInObjects: false }], //大括号内是否允许不必要的空格
    'array-bracket-spacing': [2, 'never'] //是否允许非空数组里面有多余的空格
  }
};

