<template>
  <div class="table-data">
    <el-dialog
      title="
                    Kategoriya qo'shish
                "
      :visible.sync="isAddModal"
    >
      <el-form
        :model="category"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <div class="form">
          <div class="col-12">
            <el-form-item label="Kategoriya nomi (uz)" prop="nameuz">
              <el-input
                v-model="category.nameuz"
                placeholder="Kategoriya nomi (uz)"
              ></el-input>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item label="Kategoriya nomi (ru)" prop="nameru">
              <el-input
                v-model="category.nameru"
                placeholder="Kategoriya nomi (ru)"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="create"> Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="
                    Kategoriya nomini o'zgartirish
                "
      :visible.sync="isEditModal"
    >
      <el-form
        :model="Editdata"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <div class="form">
          <div class="col-12">
            <el-form-item label="Kategoriya nomi (uz)" prop="nameuz">
              <el-input
                v-model="category.nameuz"
                placeholder="Kategoriya nomi (uz)"
              ></el-input>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item label="Kategoriya nomi (ru)" prop="nameru">
              <el-input
                v-model="category.nameru"
                placeholder="Kategoriya nomi (ru)"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="create"> Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="title-box-top">
      <div class="title-top-left">
        <h4 class="title-page">Kategoriya</h4>
      </div>

      <div class="title-box-right flex">
        <div class="export">
          <el-button size="medium" type="success" @click="openModalAdd">
            <i class="el-icon-plus"></i> Qo'shish</el-button
          >
        </div>
      </div>
    </div>
    <div class="table">
      <table v-if="cat != null">
        <thead>
          <tr>
            <th>#</th>
            <th>Kategoriya nomi(uz)</th>
            <th>Kategoriya nomi(ru)</th>
            <th>Yaratilgan sana</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="border-bottom: 1px solid"
            v-for="(item, index) in cat"
            :key="item"
          >
            <td>{{ index + 1 }}</td>
            <td>
              {{ item.nameuz }}
            </td>
            <td>
              {{ item.nameru }}
            </td>
            <td>
              {{ item.createdAt.slice(0, 10) }}
            </td>

            <td>
              <div class="table-actions">
                <el-button
                  @click="openModalEdit(item._id)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  plain
                  class="edit"
                ></el-button>

                <el-popconfirm
                  title="Ma`lumotni o'chirmoqchimisiz?"
                  confirm-button-text="Ha"
                  cancel-button-text="Yo'q"
                  cancel-button-type="danger"
                  @confirm="confirmDelete(item._id)"
                >
                  <el-button
                    slot="reference"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    plain
                  ></el-button>
                </el-popconfirm>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {
        nameuz: "",
        nameru: "",
      },
      rules: {
        nameuz: [
          { min: 3, message: 'Kategoriya nomi kamida 3ta belgi bo\'lishi kerak', trigger: 'blur' },
          {
            required: true,
            
            message: "Kategoriya nomini kiriting (uz)",
            trigger: "blur",
          },
        ],
        nameru: [
          { min: 3, message: 'Kategoriya nomi kamida 3ta belgi bo\'lishi kerak', trigger: 'blur' },
          {
            required: true,
            message: "Kategoriya nomini kiriting (ru)",
            trigger: "blur",
          },
        ],
      },
      Editdata: null,
      isAddModal: false,
      isEditModal: false,
      cat: null,
    };
  },
  async mounted() {
    let cat = await this.$axios.$get("/category");
    this.cat = cat.data;
    // console.log(cat)
  },
  methods: {
    openModalAdd() {
      this.isAddModal = true;
    },
    async getData() {
      let cat = await this.$axios.$get("/category");
      this.cat = cat.data;
    },
    async openModalEdit(id) {
      let catEdit = await this.$axios.$post("/category/by/" + id);
      this.Editdata = catEdit.data;
      console.log("assaa", this.Editdata);
      this.isEditModal = true;
    },
    async create() {
      await this.$axios.$post("/category", this.category);
      this.isAddModal = false;
      this.getData();
      console.log("true");
    },
    async confirmDelete(id) {
      await this.$axios.$delete("/category/" + id);
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.table-data {
  background: #fff;
  padding: 20px;
  box-shadow: 0 4px 10px hsl(0deg 0% 92% / 30%);
  border-radius: 10px;
}
</style>
