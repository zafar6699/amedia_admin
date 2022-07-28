<template>
  <div class="table-data">
    <el-dialog
      title="
                    Yangilik qo'shish
                "
      :visible.sync="isAddModal"
    >
      <el-form :model="category" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="form">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Nomi (uz)" prop="name.uz">
                <el-input v-model="news.name.uz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Nomi (ru)" prop="name.ru">
                <el-input v-model="news.name.ru"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Ma`lumot (uz)" prop="description.uz">
                <el-input type="textarea" v-model="news.description.uz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Ma`lumot (ru)" prop="description.ru">
                <el-input type="textarea" v-model="news.description.ru"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="grid-content"></div>
              <el-form-item label="Teg" prop="name.uz">
                <el-input v-model="news.tags"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="col-3">
            <el-form-item label="Rasm qo'shish" prop="">
              <el-col :span="8">
                <label for="image2" class="upload-button">
                  <input @change="changeImage($event)" type="file" id="image2" />
                  <img
                    :src="$cdn + news.image"
                    onerror="this.style.display='none'"
                    onload="this.style.display=''"
                  />
                  <i class="el-icon-picture-outline img-icon"></i>

                  <div class="opacity">
                    <i class="el-icon-upload2 upload-icon"></i>
                  </div>
                </label>
              </el-col>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="create()">Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="
                    Yangilik o'zgartirish
                "
      :visible.sync="isEditModal"
    >
      <el-form :model="category" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="form" v-if="Editdata != null">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Nomi (uz)" prop="name.uz">
                <el-input v-model="Editdata.name.uz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Nomi (ru)" prop="name.ru">
                <el-input v-model="Editdata.name.ru"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Ma`lumot (uz)" prop="description.uz">
                <el-input type="textarea" v-model="Editdata.description.uz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content"></div>
              <el-form-item label="Ma`lumot (ru)" prop="description.ru">
                <el-input type="textarea" v-model="Editdata.description.ru"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="grid-content"></div>
              <el-form-item label="Teg" prop="name.uz">
                <el-input v-model="Editdata.tags"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="col-3">
            <el-form-item label="Rasm qo'shish" prop="nameru">
              <el-col :span="8">
                <label for="image2" class="upload-button">
                  <input @change="changeImage($event)" type="file" id="image2" />
                  <img
                    :src="$cdn + Editdata.image"
                    onerror="this.style.display='none'"
                    onload="this.style.display=''"
                  />
                  <i class="el-icon-picture-outline img-icon"></i>

                  <div class="opacity">
                    <i class="el-icon-upload2 upload-icon"></i>
                  </div>
                </label>
              </el-col>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="title-box-top">
        <div class="title-top-left"></div>

        <div class="title-box-right flex">
          <el-button type="success" @click="update()">Saqlash</el-button>
        </div>
      </div>
    </el-dialog>
    <div class="title-box-top">
      <div class="title-top-left">
        <h4 class="title-page">Yangiliklar</h4>
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
            <th>Yangiliklar nomi (uz)</th>
            <th>Yangiliklar nomi (ru)</th>
            <th>Teglar</th>
            <th>Yaratilgan sana</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid" v-for="item in janrs" :key="item">
            <td>{{ item.name.uz }}</td>
            <td>{{ item.name.ru }}</td>
            <td>...</td>
            <td>{{ item.date.slice(0, 10) }}</td>
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
      news: {
        name: {
          uz : "",
          ru : ""
        },
        description: {
          uz : "",
          ru : ""
        },
        image: "",
        tags: ""
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
      let data = await this.$axios.$get(`news/${id}`);
      this.Editdata = data.data;
      console.log('aaa', this.news)
      this.isEditModal = true;
    },
    changePagination(page) {
      this.page = page;

      this.getData();
    },

    async changeImage(event) {
      let fd = new FormData();
      fd.append("image", event.target.files[0]);

      this.$axios({
        url: "file/create",
        method: "POST",
        data: fd
      }).then(res => {
        this.news.image = res.data.data.path;
      });
    },
    async confirmDelete(id) {
      await this.$axios.$delete("/news/" + id).then(res => {
        this.$message({
          message: "Ma'lumot o'chirildi",
          type: "success"
        });
      });
      this.getData();
    },
     update() {
      this.$axios.$put("/news/" + this.Editdata._id, this.news).then(res => {
        this.isEditModal = false;
        this.$message({
          message: "O'zgartirildi",
          type: "success",
          showClose: true
        });
      });
    },
    create() {
      this.$axios.$post("/news/add", this.news).then(res => {
        this.$message({
          message: "Qo'shildi",
          type: "success",
          showClose: true
        });
        this.$router.push("/serial");
      });
    },
    async getData() {
      let data = await this.$axios.$get(`news/all?page=${this.page}`);

      this.janrs = data.data;

      this.length = data.count;
    }
  }
};
</script>

<style></style>
