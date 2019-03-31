const startTime = Date.now()
const puppeteer = require('puppeteer')
// 豆瓣电影TOP250
const url = 'https://movie.douban.com/top250'
// 等待函数
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // 打开url并等待网络请求完成
  await page.goto(url, { waitUntil: 'networkidle2' })

  let result = []
  // 遍历10页
  for (let i = 0; i < 10; ++i) {
    await wait(3000)
    // 等待下一页按钮加载
    await page.waitForSelector('.next')
    // 网页上下文中执行代码
    let ret = await page.evaluate(() => {
      var links = []
      // 网页上下文中有jQuery可用
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
})()
