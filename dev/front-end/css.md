# css

``` css
/* 渐变 默认从上到下，0deg从下向上 */
background-image: linear-gradient(90deg, #D1494F 0%, #DE8063 100%);
```

``` css
/* 超出隐藏 */
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

``` css
/* 简写 */
/* css2.1 */
background-color 使用的背景颜色。
background-image 使用的背景图像。
background-repeat 如何重复背景图像。
background-attachment 背景图像是否固定或者随着页面的其余部分滚动。
background-position 背景图像的位置。 left top center 100% calc(100% - 10px)
/* css3 */
background-size 背景图片的尺寸。
background-origin 背景图片的定位区域。
background-clip 背景的绘制区域。
/* 多个背景可使用逗号隔开 */
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];
.example {
  background: aquamarine 
              url(img.png) 
              no-repeat 
              scroll 
              center center / 50% 
              content-box content-box;
}
```

- min-height不能被继承
