<template>
  <div class="xtx-pagination">
    <a
      @click="changePager(myCurrentPage - 1)"
      v-if="myCurrentPage > 1"
      href="javascript:;"
    >
      上一页
    </a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      @click="changePager(i)"
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: i === myCurrentPage }"
    >
      {{ i }}
    </a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      @click="changePager(myCurrentPage + 1)"
      v-if="myCurrentPage < pager.pageCount"
      href="javascript:;"
    >
      下一页
    </a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue-demi";
export default {
  name: "XtxPagination",
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    // 按钮个数
    const count = 5;
    // 当前第几页
    const myCurrentPage = ref(1);
    // 总条数
    const myTotal = ref(100);
    // 每页条数
    const myPageSize = ref(10);
    const pager = computed(() => {
      // 总页数 = 总条数 / 每页条数 向上取整
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      // 起始按钮 结束按钮 按钮数组
      // 1、理想情况下
      const offset = Math.floor(count / 2);
      let start = myCurrentPage.value - offset;
      let end = start + count - 1;
      // 2、如果起始页码小于0 需要处理
      if (start < 1) {
        start = 1;
        end = start + count - 1 > pageCount ? pageCount : start + count - 1;
      }
      // 3、如果结束页码大于总页数 也需要处理
      if (end > pageCount) {
        end = pageCount;
        start = end - count + 1 < 1 ? 1 : end - count + 1;
      }
      // 按钮数组
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      // 提供计算属性数据
      return { pageCount, btnArr, start, end };
    });
    // 监听props的变化 更新组件内部的数据
    watch(
      props,
      () => {
        myTotal.value = props.total;
        myPageSize.value = props.pageSize;
        myCurrentPage.value = props.currentPage;
      },
      { immediate: true }
    );
    // 切换分页的函数
    const changePager = (page) => {
      myCurrentPage.value = page;
      // 通知父组件
      emit("current-change", page);
    };
    return { myCurrentPage, pager, changePager };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>