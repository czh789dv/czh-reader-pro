import {
  getReadTime
} from './localStorage'
import {
  realPx
} from './utils'

export const LINE_WIDTH = [{
  value: 32
},
{
  value: 32
},
{
  value: 32
},
{
  value: 32
},
{
  value: 32
},
{
  value: 32
}
]

export const MASK_WIDTH = [{
  value: 0
},
{
  value: 0
},
{
  value: 0
},
{
  value: 0
},
{
  value: 0
},
{
  value: 0
}
]

export const FONT_SIZE_LIST = [{
  fontSize: 12
},
{
  fontSize: 14
},
{
  fontSize: 16
},
{
  fontSize: 18
},
{
  fontSize: 20
},
{
  fontSize: 22
},
{
  fontSize: 24
}
]

export const FONT_FAMILY = [{
  font: 'Default'
},
{
  font: 'Cabin'
},
{
  font: 'Days One'
},
{
  font: 'Montserrat'
},
{
  font: 'Tangerine'
}
]

export function themeList(vue) {
  return [{
    //国际化  对象  别名
    alias: vue.$t('book.themeDefault'),
    //ebookjs 调用名称
    name: 'Default',
    style: {
      body: {
        'color': '#4c5059',
        'background': '#cecece',
        'padding-top': `${realPx(48)}px!important`,
        'padding-buttom': `${realPx(48)}px!important`
      }
    }
  },
  {
    alias: vue.$t('book.themeGold'),
    name: 'Gold',
    style: {
      body: {
        'color': '#5c5b56',
        'background': '#c6c2b6',
        'padding-top': `${realPx(48)}px!important`,
        'padding-buttom': `${realPx(48)}px!important`
      }
    }
  },
  {
    alias: vue.$t('book.themeEye'),
    name: 'Eye',
    style: {
      body: {
        'color': '#404c42',
        'background': '#a9c1a9',
        'padding-top': `${realPx(48)}px!important`,
        'padding-buttom': `${realPx(48)}px!important`
      }
    }
  },
  {
    alias: vue.$t('book.themeNight'),
    name: 'Night',
    style: {
      body: {
        'color': '#cecece',
        'background': '#000000',
        'padding-top': `${realPx(48)}px!important`,
        'padding-buttom': `${realPx(48)}px!important`
      }
    }
  }
  ]
}
//添加动态CSS
export function addCss(href) {
  //创建link标签
  const link = document.createElement('link')
  //添加属性   样式表 CSS 链接
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  //获取head标签 第0个 元素 在最后面添加子标签
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss(href) {
  //找到所有link标签
  const links = document.getElementsByTagName('link')
  //倒叙遍历
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    //link存在 然后link有href 然后 href传进来的href 1
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      //link的父节点 head标签  移除 子标签 link
      link.parentNode.removeChild(link)
    }
  }
}

export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_glod.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

export function getReadTimeByMinute(fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
}

export function flatten(array) {
  //递归 将树状数据扁平化 返回到一个数组
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}
