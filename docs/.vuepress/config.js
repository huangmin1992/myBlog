module.exports = {
    title: 'hyc\'s blog',
    description: '记录',
    head: [
        ['link', { rel: "icon", type: 'image/x-icon', href: './favicon.ico' }]
    ], // 注入到当前页面的html<head>中的标签 eg:heade:[['link',{rel:'icon',href:'/logo.jpg'}]]
    base: '/myBlog/', // 这是部署到GitHub先关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        displayAllHeaders: true, // 显示所有界面的表填链接
        nav: [ // 导航栏配置
            { text: "首页", link: '/home/' },
            { text: "Angular", link: '/Angular/' },
            { text: "Vue", link: '/Vue/' },
            { text: "Web", link: '/web/' },
            { text: "Github", link: 'https://github.com/huangmin1992/myBlog' }
        ],
        sidebar: {
            '/home/': [
                ''
            ],
            '/Angular/': [
                ''
            ],
            '/Vue/': [
                ''
            ],
            '/web/': [
                ['css', 'Css'],
                ['javascript', 'Javascript'],
                ['html', 'Html']
            ]
        },
        sidebarDepth: 2 // 侧边栏显示2级为标题导航
    }
}
// 参考解决方案  https://b.himnt.top/blog/base/