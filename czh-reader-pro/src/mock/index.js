import Mock from 'mockjs'
//首页数据
import home from './bookHome'
//书架数据
import shelf from './bookShelf'
//所有列表
import list from './bookList'
//查询用
import flatList from './bookFlatList'
//用户信息
import userInfo from './userInfo'

//正则匹配URL/BOOK/HOME get方法
Mock.mock(/\/book\/home/, 'get', home)
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/flat-list/, 'get', flatList)
Mock.mock(/\/user\/info/, 'get', userInfo)
