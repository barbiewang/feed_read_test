# feed_read_test
本应用使用了google feed API，并用Jasmine测试软件测试了5个suit,里面有7项spec。
# 该应用测试内容及方法如下：
## 1.测试allFeeds变量
* 判断是否定义了该变量，使用了toBeDefined方法；
## 2.测试allFeeds变量里的key
* 判断是否有name和url，使用了和第一个测试相同的方法。因测试name和url的步骤基本相同，所以写了一个函数someDetection简化代码量;
## 3.测试应用中的菜单元素
* 判断菜单是否默认隐藏
  由于菜单默认隐藏的原因是body里有一个menu-hidden class，所以用jquery hasClass方法判断;
* 判断点击菜单栏的时候菜单是否出现，再次点击是否隐藏
  方法同以上判断，每次点击的是否判断是否有menu-hidden class
## 4.测试loadFeed函数是被调用载
* 判断loadFeed函数是否被调用，由于loadFeed是异步函数，故利用了Jasmine的beforeEach方法，然后判断内容区是否有内容；
## 5.测试loadFeed函数是否能正确获取数据
* 判断loadFeed加载新源的时候内容区的text是否变化，判断方法基本与第四项测试相同。
