<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    // 用法：
    // 1、template标签去除 单文件组件
    // 2、返回值就是组件内容
    // 3、vue2.0的h函数传参进来的 vue3.0的h函数导入进来
    // 4、h的第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点
    // 需求：
    // 1、创建xtx-bread父容器
    // 2、获取默认插槽内容
    // 3、去除xtx-bread-item组件的i标签 应该由render函数来组织
    // 4、遍历插槽中的item 得到一个动态创建的节点 最后一个item不加i标签
    // 5、把动态创建的节点渲染到xtx-bread标签中
    const items = this.$slots.default();
    const dynamicItems = [];
    items.forEach((item, i) => {
      dynamicItems.push(item);
      if (i < items.length - 1) {
        dynamicItems.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "xtx-bread" }, dynamicItems);
  },
};
</script>
<style lang='less'>
// 去除scoped属性 目的是让样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素 找到所有的子元素 找到最后一个 判断是不是li 是就选中 不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素 找到所有的类型为li的元素 选中最后一个
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式去掉最后一个箭头
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>