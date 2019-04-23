const puppeteer = require('puppeteer')
// 等待函数
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// 豆瓣电影TOP250
const getTop250 = async () => {
  const startTime = Date.now()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // 打开url并等待网络请求完成
  await page.goto('https://movie.douban.com/top250', { waitUntil: 'networkidle2' })

  let result = []
  // 遍历10页
  for (let i = 0; i < 10; ++i) {
    await page.waitFor(1111)
    // 等待下一页按钮加载
    await page.waitForSelector('.next')
    // 网页上下文中执行代码
    let ret = await page.evaluate(() => {
      var links = []
      // 网页上下文中有jQuery可用, 否则提前注入 await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})
      var $ = window.$
      var items = window.$('.grid_view > li')
      if (items.length > 0) {
        // 遍历电影列表从DOM中取信息
        items.each((index, item) => {
          links.push({
            id: $(item).find('.pic > a').attr('href').replace('https://movie.douban.com/subject/','').replace('/',''),
            title: $(item).find('.title').text(),
            img: $(item).find('.pic > a > img').attr('src').replace('s_', 'l_').replace('.webp', '.jpg'),
            rating_num: Number($(item).find('.rating_num').text()),
          })
        })
      }
      return links
    })
    result = [...result, ...ret]
    // 点击去下一页
    await page.click('.next')
  }
  browser.close()
  console.log(result)
  console.log('耗时', `${Date.now()-startTime}ms`)
  return result
}

// 过滤讨论内容
const searchDiscussion = async () => {
  const startTime = Date.now()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.douban.com/group/625354/discussion', { waitUntil: 'networkidle2' })

  let result = []
  for (let i = 0; i < 2; ++i) {
    await page.waitFor(1111)
    await page.waitForSelector('.next')
    let ret = await page.evaluate(() => {
      // 过滤
      // const keyword = ['整租', '出租,十号线']
      const keyword = ['北纬']
      const checkDiscussionTitle = (title, keyword) => {
        if (!title) return
        if (typeof keyword === 'string') keyword = [keyword]
        if (!Array.isArray(keyword)) return
        if (keyword.every(key => !key)) return true

        return keyword.some(key => {
          if (typeof key !== 'string') return
          const arr = key.split(',')
          return arr.every(str => title.indexOf(str) > -1)
        })
      }
      var links = []
      var $ = window.$
      var items = window.$('.olt tr')
      if (items.length > 0) {
        items.each((index, item) => {
          if (index === 0) return
          const title = $(item).find('.title > a').text()
          const detail = $(item).find('.title > a').attr('href')
          const reply_num = Number($(item).find('td').eq(2).text())
          const time = $(item).find('.time').text()

          if (!checkDiscussionTitle(title, keyword)) return
          links.push({
            title: title,
            detail: detail,
            reply_num: reply_num,
            time: time,
          })
        })
      }
      return links
    })
    result = [...result, ...ret]
    await page.click('.next')
  }
  browser.close()
  console.log(result)
  console.log('耗时', `${Date.now()-startTime}ms`)
  return result
}

const typeAndClick = async (page, input, text, button) => {
  await page.waitFor(input)
  await page.$eval(input, ele => ele.value='' )
  await page.type(input, text, { delay: 222 })
  await page.waitFor(button)
  await page.click(button)
  await page.waitFor(6666)
}
const addPoilistMarker = async (page) => {
  await page.waitFor('.poilist')
  return await page.evaluate(() => {
    var count = 0
    var $list = $('.poilist .cf')
    $list.each(function (i, item) {
      $(item).addClass(`mypoilist${i}`)
      count++
    })
    return count
  })
}
const getPoilistInfo = async page => {
  let result = []
  for (let i=0; i<10; ++i) {
    await page.waitFor('.poilist')
    await addPoilistMarker(page)
    let itemClass = `.mypoilist${i}`
    await page.click(itemClass)
    await page.waitFor(1111)
    await page.waitFor('.status-return')
    await page.waitFor('.generalHead-titlename')
    let ret = await page.evaluate(() => {
      var $container = $('.poidetail-container')
      return {
        title: $container.find('.generalHead-titlename').text(),
        address: $container.find('.generalInfo-address-text').text(),
        tel: $container.find('.generalInfo-telnum-text').text(),
      }
    })
    result.push(ret)
    await page.click('.status-return')
    await page.waitFor(1111)
  }
  return result
}
// 搜索地图
const searchMap = async (area, keyword) => {
  const startTime = Date.now()
  let result = []
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://map.baidu.com/', { waitUntil: 'networkidle2' })

  await typeAndClick(page, '#sole-input', area, '#search-button')
  await typeAndClick(page, '#sole-input', keyword, '#search-button')
  
  let ret = await getPoilistInfo(page)
  result = result.concat(ret)
  // browser.close()
  console.log(result)
  console.log('耗时', `${Date.now()-startTime}ms`)
  return result
}

// getTop250()
searchDiscussion()
// searchMap('杭州', '麦当劳')
