<template>
  <div class="table-data">
     <el-dialog
        title="
                    Janr qo'shish
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
              <el-form-item label="Janr nomi (uz)"   prop="nameuz">
                <el-input v-model="category.nameuz"  placeholder="Janr nomi (uz)"></el-input>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Janr nomi (ru)" prop="nameru">
                <el-input
                  v-model="category.nameru"
                  placeholder="Janr nomi (ru)"
                ></el-input>
              </el-form-item>
            </div>

           

        
          </div>
        </el-form>
        <div class="title-box-top">
          <div class="title-top-left"></div>

          <div class="title-box-right flex">
            <el-button type="success" @click="create(category)"> Saqlash</el-button>
          </div>
        </div>
      </el-dialog>
     <el-dialog
        title="
                    Janr nomini o'zgartirish
                "
        :visible.sync="isEditModal"
      >
        <el-form
          :model="Editdata"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="form" v-if="Editdata != null">
            <div class="col-12">
              <el-form-item label="Janr nomi (uz)"   prop="nameuz">
                <el-input v-model="Editdata.nameuz"  placeholder="Janr nomi (uz)"></el-input>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Janr nomi (ru)" prop="nameru">
                <el-input
                  v-model="Editdata.nameru"
                  placeholder="Janr nomi (ru)"
                ></el-input>
              </el-form-item>
            </div>

           

        
          </div>
        </el-form>
        <div class="title-box-top">
          <div class="title-top-left"></div>

          <div class="title-box-right flex">
            <el-button type="success" @click="update(Editdata._id)"> Saqlash</el-button>
          </div>
        </div>
      </el-dialog>
    <div class="title-box-top">
      <div class="title-top-left">
        <h4 class="title-page">Janrlar</h4>
      </div>

      <div class="title-box-right flex">
        <div class="export">
          <el-button size="medium" type="success" @click="openModalAdd">
            <i class="el-icon-plus"></i> Qo'shish</el-button
          >
        </div>
      </div>
    </div>
    <div class="table" v-if="janrs != null">
      <table>
        <thead>
          <tr>
            <th>Janr nomi(uz)</th>
            <th>Janr nomi(ru)</th>
            <th>Yaratilgan sana</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="border-bottom: 1px solid"
            v-for="item in janrs"
            :key="item"
          >
            <td>{{ item.nameuz }}</td>
            <td>
              <div class="name"></div>
              {{ item.nameru }}
            </td>
            <td>
              <div class="name"></div>
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

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="length"
          :page-size="limit"
          :current-page="page"
          @current-change="changePagination"
        >
        </el-pagination>
      </div>
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
          { min: 3, message: 'Janr nomi kamida 3ta belgi bo\'lishi kerak', trigger: 'blur' },
          {
            required: true,
            
            message: "Janr nomini kiriting (uz)",
            trigger: "blur",
          },
        ],
        nameru: [
          { min: 3, message: 'Janr nomi kamida 3ta belgi bo\'lishi kerak', trigger: 'blur' },
          {
            required: true,
            message: "Janr nomini kiriting (ru)",
            trigger: "blur",
          },
        ],
      },
      Editdata: null,
      isAddModal: false,
      isEditModal: false,
      cat: null,
      janrs: null,
      page: 1,
      length: 100,
      limit: 20,
    };
  },
  async mounted() {
    this.getData();
  },

  methods: {
      openModalAdd(){
      this.isAddModal = true
    },
     async openModalEdit(id){
      let catEdit = await this.$axios.$get('/janr/admin/' + id);
      this.Editdata = catEdit.data
      console.log('assaa',this.Editdata)
      this.isEditModal = true
    },
      async create(category){
      //  this.$refs[ruleForm].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
    
      let create = await this.$axios.$post('/janr/admin', this.category);
      this.isAddModal = false
      this.getData()
      console.log('true')
    },
    async update(id){
      let create = await this.$axios.$put('/janr/admin/' + id, this.Editdata);
       this.isEditModal = false
      this.getData()
      console.log('true')
    },
    async confirmDelete(id){
       let create = await this.$axios.$delete('/janr/admin/' + id);
      this.getData()

    },
    changePagination(page) {
      this.page = page;

      this.getData();
    },
    async getData() {
      let data = await this.$axios.$get(`janr/admin?page=${this.page}`);

      this.janrs = data.data;

      this.length = data.count;
    },
  },
};
</script>

<style></style>
