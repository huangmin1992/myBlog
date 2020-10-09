module.exports = {
    title: 'yellow\'s blog',
    description: '我的test example',
    head: [], // 注入到当前页面的html<head>中的标签 eg:heade:[['link',{rel:'icon',href:'/logo.jpg'}]]
    base: '/myBlog/', // 这是部署到GitHub先关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            { text: "首页", link: '/home/' }
        ],
        sidebar: {
            '/home/':[
                '',
                'one'
            ],
            '/bar/':[
                '',
                'two'
            ]
        },
        sidebarDepth: 2 // 侧边栏显示2级
    },
}