/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('urls are defined',function(){
            for (var i = 0; i < allFeeds.length; i++) {
                // 检查 URL 格式是否正确的正规表达式
                var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
                // 检查格式
                expect(allFeeds[i].url).toMatch(regularExpressionUrl);
            }
            //调用函数
            sameDetection("url");

        });

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
        it('names are defined',function(){
            //调用函数
            sameDetection("name");

        });

        //该函数可直接被上面两个spec调用，避免重复写代码；
        function sameDetection(ele) {
            for (var i = 0; i < allFeeds.length; i++) {
                var element =  allFeeds[i][ele];
                expect(element).toBeDefined();
                expect(element.length).not.toBe(0);

            }
        }
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
   describe("The menu",function(){

        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
       it("should be hidden default",function(){
           expect($("body").hasClass("menu-hidden")).toBe(true);
       });

       /* TODO:
        * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
        * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
        * 再次点击的时候是否隐藏。
        */
       it("should toggle hidden when click", function() {

           menuIcon = $('.menu-icon-link');

           menuIcon.click();
           //这里用jquery的hasClass方法更好理解
           expect($("body").hasClass("menu-hidden")).toBe(false);
           // var menuHidden = $(".menu-hidden");
           // expect(menuHidden.length).toEqual(0);
           menuIcon.click();
           expect($("body").hasClass("menu-hidden")).toBe(true);
           // menuHidden = $(".menu-hidden");
           // expect(menuHidden.length).toEqual(1);

       });

   });
    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe("Initial Entries",function() {
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */

        //由于loadFeed自带一个callback,所以直接将done写在loadFeed里
        beforeEach(function (done) {
            loadFeed(0, done);
        },5000);//设置5s的时间，保证有一定的时间加载loadFeed，推迟执行剩余的测试

        //如果loadFeed加载成功，判断内容区是否有内容；
        it("be loadFeed", function(){
            var container = $('.feed');
            expect(container.length).toBeGreaterThan(0);
        });
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe("New Feed Selection",function() {
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */

        //同上，先加载异步函数loadFeed(2)
        beforeEach(function (done) {
            loadFeed(2, done)
        },5000);//设置5s的时间，保证有一定的时间加载loadFeed，推迟执行剩余的测试

        //判断之前加载的loadFeed(2)的内容是否等于loadFeed(0)的内容
        it("load container1", function (done) {
            //获取已加载的loadFeed(2)的内容
            var text2 = $('.feed').text();
            //加载loadFeed(0)的内容，以便比较是否内容真的改变了
            loadFeed(0, function () {
                var text0 = $('.feed').text();
                expect(text0).not.toEqual(text2);
                done();
            });
        });
    });

    //以下为导师的嵌套执行方法，备份
    // var text1,
    //     text2;
    // beforeEach(function(done){
    //     loadFeed(0,function(){
    //         text1 = $(".feed").text();
    //         //console.log("1加载完了");
    //         loadFeed(1,function(){
    //             text2 = $(".feed").text();
    //             //console.log("2加载完了");
    //             done();
    //         });
    //     });
    // });
    // it("container change",function(){
    //     expect(text1).not.toEqual(text2);
    //     //console.log("比较完了");
    // })

}());
