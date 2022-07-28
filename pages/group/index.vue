<template>
  <div class="pupil">
    <el-card class="box-card">
      <el-dialog
        title="
                        O'quvchi o'zgartirish
                "
        :visible.sync="isModalEdit"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="form">
            <div class="col-3">
              <el-form-item label="F.I.O" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>

            <div class="col-3">
              <el-form-item label="O'quvchini tanlang" prop="region">
                <el-select
                  v-model="ruleForm.region"
                  placeholder="O'quvchini tanlang"
                >
                  <el-option label="Admin" value="shanghai1"></el-option>
                  <el-option label="Modarator" value="beijing2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Login" prop="name">
                <el-input v-model="ruleForm.login"></el-input>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Parol" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  show-password
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="title-box-top">
          <div class="title-top-left"></div>

          <div class="title-box-right flex">
            <el-button type="success" @click="edit"> Saqlash</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="
                        O'quvchi qo'shish
                "
        :visible.sync="dialogTableVisible"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="form">
            <div class="col-12">
              <el-form-item label="F.I.O" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
            <div class="col-12">
              <el-form-item label="Aloqa" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>

            <div class="col-3">
              <el-form-item label="Fanni tanlang" prop="region">
                <el-select
                  v-model="ruleForm.region"
                  placeholder="Fanni tanlang"
                >
                  <el-option label="Fizika" value="1"></el-option>
                  <el-option label="Matematika" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Guruhni tanlang" prop="region">
                <el-select
                  v-model="ruleForm.region2"
                  placeholder="Guruhni tanlang"
                >
                  <el-option label="101" value="1"></el-option>
                  <el-option label="102" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Login" prop="name">
                <el-input v-model="ruleForm.login"></el-input>
              </el-form-item>
            </div>
            <div class="col-3">
              <el-form-item label="Parol" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  show-password
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
          <h4 class="title-page">Barcha guruhlar</h4>
        </div>

        <div class="title-box-right flex">
          <div class="export">
            <el-button size="medium" class="bg-btn" @click="openModalAdd">
              <i class="el-icon-download"></i> Export</el-button
            >

           
          </div>
          <div>
            <el-button size="medium" class="bg-btn" @click="openModalAdd">
              <i class="el-icon-plus"></i> Guruh ochish</el-button
            >
          </div>
        </div>
      </div>
      <div class="table">
        <table v-if="tableData1 != null">
          <thead>
            <tr>
              <th>#</th>
              <th>Guruh</th>
              <th>O'qituvchi</th>
              <th>Vaqti</th>
              <th>Ta'lim turi</th>
              <th>Xona</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="border-bottom: 1px solid"
              v-for="(item, index) in tableData1"
              :key="item"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="name"></div>
                {{ item.name }}
              </td>
              <td>
                <div class="name"></div>
                {{ item.tel }}
              </td>
              <td>
                {{ item.group }}
              </td>
              <td>
                <div class="name"></div>
                {{ item.type }}
              </td>
              <td>
               {{item.oplata}}
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
    </el-card>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        login: "",
        pass: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Loginni kiriting",
            trigger: "blur",
          },
        ],
        login: [
          {
            required: true,
            message: "Loginni kiriting",
            trigger: "blur",
          },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },

      user: "",
      editId: null,
      editName: null,
      dialogTableVisible: false,
      isModalEdit: false,
      tableData: null,
      tableData1: [
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
        {
          name: "101",
          year: 1998,
          tel: 'Xushnudbek Ayitboyev',
          type: "offline",
          guruhi: "Matematika",
          group: '14:00:16:30' ,
          oplata: '2',
          img: {
            id: 1232312,
            path: "as",
          },
        },
      
      ],
    };
  },

  async mounted() {
    this.getData();
  },

  methods: {
    openModalAdd() {
      this.dialogTableVisible = true;
    },
    async openModalEdit(id) {
      this.isModalEdit = true;
      console.log(id);
      let editData = await this.$axios.get("category/" + id);
      this.editId = id;
      this.ruleForm.name = editData.data.data[0].name;
      console.log("galdi ed", this.ruleForm.name);
    },
    async getData() {
      let category = await this.$axios.get("user/all");
      this.tableData = category.data.data;
      console.log("qani", this.tableData);
    },
    async create() {
      this.user.name = this.ruleForm.name;
      this.user.login = this.ruleForm.login;
      this.user.password = this.ruleForm.password;
      this.user.type = this.ruleForm.password;
      let name = await this.$axios
        .post("user/create", { name: this.name })
        .then((res) => {
          this.dialogTableVisible = false;
          this.getData();
          this.ruleForm.name = "";
          this.$message({
            message: "O'quvchi qo'shildi",
            type: "success",
          });
          console.log("ok");
        });
    },
    async edit() {
      this.name = this.ruleForm.name;
      let name = await this.$axios
        .put("user/" + this.editId, { name: this.name })
        .then((res) => {
          this.isModalEdit = false;
          this.getData();
          this.ruleForm.name = "";
          this.$message({
            message: "O'quvchi o'zgartirildi",
            type: "success",
          });
        });
    },
    async confirmDelete(id) {
      await this.$axios.delete("user/" + id).then((res) => {
        this.getData();
        this.name = "";
        this.$message({
          message: "O'quvchi o'chirildi",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.pupil {
  .el-dialog__body {
    padding-top: 0px !important;
  }
}
span.true {
  background: #67c23a;
  padding: 2px 5px;
  border-radius: 15px;
  font-size: 14px;

  color: aliceblue;
}
span.false {
  background: #b10e0e;
  padding: 2px 5px;
  border-radius: 15px;
  font-size: 14px;

  color: aliceblue;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .col-12 {
    width: 100%;
  }
  .col-3 {
    width: calc((100% - 20px) / 2);
    .el-select {
      width: 100%;
    }
  }
}
.title-box-top {
  margin-bottom: 0;
}
</style>
