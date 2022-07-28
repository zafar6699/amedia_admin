<template>
  <div class="table-data">
    <el-dialog
      title="
                    Narx qo'shish
                "
      :visible.sync="isAddModal"
    >
      <el-form :model="category" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="form">
          <div class="col-12">
            <el-form-item label="To'lov nomi" prop="name">
              <el-input v-model="category.name" placeholder="To'lov nomi"></el-input>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item label="Narx" prop="amount">
              <el-input type="number" v-model="category.amount" placeholder="Narx"></el-input>
            </el-form-item>
          </div>
          <div class="col-12">
             <el-form-item label="To'lov muddati" prop="nameru">

            <el-select v-model="category.type" placeholder="To'lov muddati">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
             </el-form-item>

            
          </div>
          
        </div>
      </el-form>
      
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="create(category)">Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="
                    Narx o'zgartirish
                "
      :visible.sync="isEditModal"
    >
      <el-form :model="Editdata" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="form" v-if="Editdata != null">
          <div class="col-12">
            <el-form-item label="Janr nomi (uz)" prop="nameuz">
              <el-input v-model="Editdata.name" placeholder="Janr nomi (uz)"></el-input>
            </el-form-item>
          </div>
          <div class="col-3">
            <el-form-item label="Janr nomi (ru)" prop="nameru">
              <el-input v-model="Editdata.amount" placeholder="Janr nomi (ru)"></el-input>
            </el-form-item>
          </div>
           <div class="col-12">
             <el-form-item label="To'lov muddati" prop="nameru">

            <el-select v-model="Editdata.type" placeholder="To'lov muddati">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
             </el-form-item>

            
          </div>
        </div>
      </el-form>
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="update(Editdata._id)">Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="title-box-top">
      <div class="title-top-left">
        <h4 class="title-page">Narxlar</h4>
      </div>

      <div class="title-box-right flex">
        <div class="export">
          <el-button size="medium" type="success" @click="openModalAdd">
            <i class="el-icon-plus"></i> Qo'shish
          </el-button>
        </div>
      </div>
    </div>
    <div class="table" v-if="janrs != null">
      <table>
        <thead>
          <tr>
            <th>To'lov nomi</th>
            <th>To'lov qiymati</th>
            <th>To'lov muddati</th>
            <th>Yaratilgan sana</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid" v-for="item in janrs" :key="item">
            <td>{{ item.name }}</td>
            <td>{{ item.amount }} so'm</td>
            <td>
              <div v-if="item.type == 1" class="n">
                <el-tag class="status" type="success" effect="dark" size="small">1 oylik</el-tag>
              </div>
              <div v-if="item.type == 3" class="n">
                <el-tag type="primary" class="status" effect="dark" size="small">3 oylik</el-tag>
              </div>
              <div v-if="item.type == 6" class="n">
                <el-tag type="info" class="status" effect="dark" size="small">6 oylik</el-tag>
              </div>
              <div v-if="item.type == 10" class="n">
                <el-tag type="warning" class="status" effect="dark" size="small">1 yillik</el-tag>
              </div>
            </td>
            <td>{{ item.createdAt.slice(0, 10) }}</td>

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
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" plain></el-button>
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
        ></el-pagination>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "1 oylik"
        },
        {
          value: "3",
          label: "3 oylik"
        },
        {
          value: "6",
          label: "6 oylik"
        },
        {
          value: "10",
          label: "1 yillik"
        }
      ],
      category: {
        type: "",
        name: "",
        amount: ""
      },
      rules: {
        name: [
          {
            min: 3,
            message: "Maydon kamida 3ta belgi bo'lishi kerak",
            trigger: "blur"
          },
          {
            required: true,

            message: "Maydon to'ldirilshi shart",
            trigger: "blur"
          }
        ],
        amount: [
          {
            min: 3,
            message: "Maydon nomi kamida 3ta belgi bo'lishi kerak",
            trigger: "blur"
          },
          {
            required: true,
            message: "Maydon to'ldirilshi shart",
            trigger: "blur"
          }
        ]
      },
      Editdata: null,
      isAddModal: false,
      isEditModal: false,
      janrs: null,
      page: 1,
      length: 100,
      limit: 20
    };
  },
  async mounted() {
    this.getData();
  },

  methods: {
    openModalAdd() {
      this.isAddModal = true;
    },
    async openModalEdit(id) {
      let catEdit = await this.$axios.$get("/pricelist/" + id);
      this.Editdata = catEdit.data;
      console.log("assaa", this.Editdata);
      this.isEditModal = true;
    },
    async create(category) {
      //  this.$refs[ruleForm].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });

      let create = await this.$axios.$post("/pricelist", this.category);
      this.isAddModal = false;
      this.getData();
      console.log("true");
    },
    async update(id) {
      let create = await this.$axios.$put("/pricelist/" + id, this.Editdata);
      this.isEditModal = false;
      this.getData();
      console.log("true");
    },
    async confirmDelete(id) {
      let create = await this.$axios.$delete("/pricelist/" + id);
      this.getData();
    },
    changePagination(page) {
      this.page = page;

      this.getData();
    },
    async getData() {
      let data = await this.$axios.$get(`pricelist`);

      this.janrs = data.data;

      this.length = data.count;
    }
  }
};
</script>

<style></style>
