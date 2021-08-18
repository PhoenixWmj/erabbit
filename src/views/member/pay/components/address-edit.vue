<template>
  <XtxDialog
    :title="`${formData.id ? '修改' : '添加'}收货地址`"
    v-model:visible="dialogVisible"
  >
    <!-- 表单 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <template #footer>
      <XtxButton
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { reactive, ref } from "vue";
import { addAddress, editAddress } from "@/api/order";
import Message from "@/components/library/Message";
export default {
  name: "AddressEdit",
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    // 打开函数
    const open = (address) => {
      dialogVisible.value = true;
      if (address.id) {
        // 如果修改 填充表单
        for (const key in address) {
          formData[key] = address[key];
        }
      } else {
        // 如果添加 清空表单
        for (const key in formData) {
          if (key === "isDefault") {
            formData[key] = 0;
          } else {
            formData[key] = null;
          }
        }
      }
    };
    // 定义表单数据对象
    const formData = reactive({
      receiver: null,
      contact: null,
      provinceCode: null,
      cityCode: null,
      countyCode: null,
      address: null,
      postalCode: null,
      addressTags: null,
      isDefault: 0,
      // 城市组件显示文字(完整行政区地址)
      fullLocation: null,
    });
    // 选择地区
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode;
      formData.cityCode = result.cityCode;
      formData.countyCode = result.countyCode;
      formData.fullLocation = result.fullLocation;
    };
    // 添加(修改)地址和提交
    const submit = () => {
      // 1、省略了校验
      // 2、发送请求
      if (formData.id) {
        // 修改请求
        editAddress(formData).then((data) => {
          // 提示
          Message({ type: "success", text: "修改收货地址成功" });
          // 关闭
          dialogVisible.value = false;
          // 触发自定义事件
          emit("on-success", formData);
        });
      } else {
        // 添加请求
        addAddress(formData).then((data) => {
          // 需要设置ID
          formData.id = data.result.id;
          // 提示
          Message({ type: "success", text: "添加收货地址成功" });
          // 关闭
          dialogVisible.value = false;
          // 触发自定义事件
          emit("on-success", formData);
        });
      }
    };
    return { dialogVisible, open, formData, changeCity, submit };
  },
};
</script>
<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>