<template>
    <div class="table-data">
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Kinofilmlar qo'shish</h4>
            </div>
        </div>
        <div class="table">
            <el-form
                :model="serial"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
                label-position="top"
            >
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="Turi" prop="tip">
                            <el-select
                                v-model="serial.tip"
                                placeholder="Turini tanlang"
                            >
                                <el-option
                                    label="Serial"
                                    value="serial"
                                ></el-option>
                                <el-option
                                    label="Kino"
                                    value="kino"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content"></div>
                        <el-form-item label="Nomi (uz)" prop="name.uz">
                            <el-input v-model="serial.name.uz"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content"></div>
                        <el-form-item label="Nomi (ru)" prop="name.ru">
                            <el-input v-model="serial.name.ru"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content"></div>
                        <el-form-item
                            label="Ma`lumot (uz)"
                            prop="description.uz"
                        >
                            <el-input
                                type="textarea"
                                v-model="serial.description.uz"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content"></div>
                        <el-form-item
                            label="Ma`lumot (ru)"
                            prop="description.ru"
                        >
                            <el-input
                                type="textarea"
                                v-model="serial.description.ru"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="serial.tip == 'serial'">
                        <div class="grid-content"></div>
                        <el-form-item label="Serialar soni">
                            <el-input v-model="serial.num"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="serial.tip == 'kino'">
                        <div class="grid-content"></div>
                        <el-form-item label="Video havola">
                            <el-input v-model="serial.video"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="serial.tip == 'kino'">
                        <div class="grid-content"></div>
                        <el-form-item label="Ko'chirish uchun havola">
                            <el-input v-model="serial.url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="serial.tip == 'kino'">
                        <div class="grid-content"></div>
                        <el-form-item label="Video davomiyligi">
                            <el-input v-model="serial.length"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                        <el-form-item label="Rejissor" prop="rejissor">
                            <el-input v-model="serial.rejissor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                        <el-form-item
                            label="Ishlab chiqarilgan mamlakat"
                            prop="country"
                        >
                            <el-input v-model="serial.country"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                        <el-form-item label="Studiya" prop="studia">
                            <el-input v-model="serial.studia"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item
                            label="Ishlab chiqarilgan yili"
                            prop="year"
                        >
                            <el-select
                                v-model="serial.year"
                                placeholder="Yilni tanlang"
                                filterable
                            >
                                <el-option value="1990"></el-option>
                                <el-option value="1991"></el-option>
                                <el-option value="1992"></el-option>
                                <el-option value="1993"></el-option>
                                <el-option value="1994"></el-option>
                                <el-option value="1995"></el-option>
                                <el-option value="1996"></el-option>
                                <el-option value="1997"></el-option>
                                <el-option value="1998"></el-option>
                                <el-option value="1999"></el-option>
                                <el-option value="2001"></el-option>
                                <el-option value="2002"></el-option>
                                <el-option value="2003"></el-option>
                                <el-option value="2004"></el-option>
                                <el-option value="2005"></el-option>
                                <el-option value="2006"></el-option>
                                <el-option value="2007"></el-option>
                                <el-option value="2008"></el-option>
                                <el-option value="2009"></el-option>
                                <el-option value="2010"></el-option>
                                <el-option value="2011"></el-option>
                                <el-option value="2012"></el-option>
                                <el-option value="2013"></el-option>
                                <el-option value="2014"></el-option>
                                <el-option value="2015"></el-option>
                                <el-option value="2016"></el-option>
                                <el-option value="2017"></el-option>
                                <el-option value="2018"></el-option>
                                <el-option value="2019"></el-option>
                                <el-option value="2020"></el-option>
                                <el-option value="2021"></el-option>
                                <el-option value="2022"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="category != null">
                        <el-form-item label="Kategoriya" prop="category">
                            <el-select
                                v-model="serial.category"
                                placeholder="Kategoriyani tanlang"
                                multiple
                                collapse-tags
                            >
                                <el-option
                                    v-for="item in category"
                                    :key="item"
                                    :label="item.nameuz"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="janr != null">
                        <el-form-item label="Janr" prop="janr">
                            <el-select
                                v-model="serial.janr"
                                placeholder="Janrni tanlang"
                                multiple
                                filterable
                                collapse-tags
                            >
                                <el-option
                                    v-for="item in janr"
                                    :key="item"
                                    :label="item.nameuz"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="users != null">
                        <el-form-item label="Ovoz beruvchi" prop="translator">
                            <el-select
                                v-model="serial.translator"
                                placeholder="Ovoz beruvchini tanlang"
                                value-key="value"
                                multiple
                                filterable
                                collapse-tags
                            >
                                <el-option
                                    v-for="item in users"
                                    :key="item"
                                    :label="item.name"
                                    :value="item._id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="users != null">
                        <el-form-item label="Tarjimon" prop="tarjimon">
                            <el-select
                                v-model="serial.tarjimon"
                                placeholder="Tarjimonni tanlang"
                                multiple
                                filterable
                                collapse-tags
                            >
                                <el-option
                                    v-for="item in users"
                                    :key="item"
                                    :label="item.name"
                                    :value="item._id"
                                ></el-option>
                            </el-select> </el-form-item
                    ></el-col>
                    <el-col :span="8">
                        <el-form-item label="To'lov turi">
                            <el-select
                                v-model="serial.price"
                                placeholder="To'lov turini tanlang"
                            >
                                <el-option
                                    label="To'lovsiz"
                                    value="free"
                                ></el-option>
                                <el-option
                                    label="To'lovli"
                                    value="selling"
                                ></el-option>
                            </el-select> </el-form-item
                    ></el-col>
                    <el-col :span="8">
                        <el-form-item label="Teglar" prop="tagstring">
                            <el-input
                                v-model="serial.tagstring"
                            ></el-input> </el-form-item
                    ></el-col>
                    <el-col :span="8">
                        <h5>Muqova rasmini yuklang</h5>

                        <label for="image1" class="upload-button">
                            <input
                                @change="changeImage($event)"
                                type="file"
                                id="image1"
                            />
                            <img
                                :src="$cdn + serial.image"
                                onerror="this.style.display='none'"
                                onload="this.style.display=''"
                            />
                            <i class="el-icon-picture-outline img-icon"></i>

                            <div class="opacity">
                                <i class="el-icon-upload2 upload-icon"></i>
                            </div>
                        </label>
                    </el-col>
                    <el-col :span="8">
                        <h5>Slider uchun rasmni yuklang</h5>
                        <label for="image2" class="upload-button">
                            <input
                                @change="changeImage2($event)"
                                type="file"
                                id="image2"
                            />
                            <img
                                :src="$cdn + serial.screens.original[0]"
                                onerror="this.style.display='none'"
                                onload="this.style.display=''"
                            />
                            <i class="el-icon-picture-outline img-icon"></i>

                            <div class="opacity">
                                <i class="el-icon-upload2 upload-icon"></i>
                            </div>
                        </label>
                    </el-col>

                    <el-col :span="16">
                        <h5>Rasmlarni yuklang</h5>

                        <div class="images-box">
                            <div
                                class="upload-button"
                                v-for="(item, index) in serial.screens.original"
                                :key="index"
                                v-if="index > 0"
                            >
                                <img :src="$cdn + item" alt="" />
                                <div class="opacity">
                                    <span @click="deleteImage(index)">
                                        <i
                                            class="el-icon-delete upload-icon"
                                        ></i>
                                    </span>
                                </div>
                            </div>

                            <label for="image3" class="upload-button">
                                <input
                                    @change="changeImage3($event)"
                                    type="file"
                                    id="image3"
                                    multiple
                                />

                                <i class="el-icon-picture-outline img-icon"></i>

                                <div class="opacity">
                                    <i
                                        class="
                                            el-icon-circle-plus-outline
                                            upload-icon
                                        "
                                    ></i>
                                </div>
                            </label>
                        </div>
                    </el-col>

                    <el-col :span="24" class="flexend">
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submitForm('ruleForm')"
                                >Saqlash</el-button
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            serial: {
                test: "",
                name: { uz: "", ru: "" },
                description: { uz: "", ru: "" },
                num: "",
                category: [],
                translator: [],
                tarjimon: [],
                video: "",
                url: "",
                rejissor: "",
                length: "",
                studia: "",
                tayming: [],
                screens: { thumb: [""], original: [""] },
                image: "",
                price: "free",
                year: "",
                janr: [],
                country: "",
                tags: [],
                tip: "serial",
                tagstring: "",
            },

            rules: {
                name: {
                    uz: [
                        {
                            required: true,
                            message: "To'liq to'ldiring",
                            trigger: "blur",
                        },
                    ],
                    ru: [
                        {
                            required: true,
                            message: "To'liq to'ldiring",
                            trigger: "blur",
                        },
                    ],
                },
                description: {
                    uz: [
                        {
                            required: true,
                            message: "To'liq to'ldiring",
                            trigger: "blur",
                        },
                    ],
                    ru: [
                        {
                            required: true,
                            message: "To'liq to'ldiring",
                            trigger: "blur",
                        },
                    ],
                },
                rejissor: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "blur",
                    },
                ],
                country: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "blur",
                    },
                ],
                tagstring: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "blur",
                    },
                ],
                studia: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "blur",
                    },
                ],
                year: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
                translator: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
                tarjimon: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
                category: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
                janr: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
                tip: [
                    {
                        required: true,
                        message: "To'liq to'ldiring",
                        trigger: "change",
                    },
                ],
            },
            tags: "",
            image: "",
            thero: "",
            fileList: [],
            imageUrl: "",
            category: null,
            janr: null,
            users: null,
            disabled: false,
        };
    },
    async mounted() {
        let category = await this.$axios.$get("category");
        this.category = category.data;

        let janr = await this.$axios.$get("janr");
        this.janr = janr.data;

        let users = await this.$axios.$get("member/all");
        this.users = users.data;
    },

    methods: {
        async changeImage(event) {
            let fd = new FormData();
            fd.append("image", event.target.files[0]);

            this.$axios({
                url: "file/create",
                method: "POST",
                data: fd,
            }).then((res) => {
                this.serial.image = res.data.data.path;
            });
        },

        async changeImage2(event) {
            let fd = new FormData();
            fd.append("image", event.target.files[0]);

            this.$axios({
                url: "file/create",
                method: "POST",
                data: fd,
            }).then((res) => {
                this.serial.screens.original[0] = res.data.data.path;
                this.serial.screens.thumb[0] = res.data.data.path;

                this.serial.screens.original.push(1);
                this.serial.screens.original.pop();
            });
        },
        async changeImage3(event) {
            this.requestImages(0, event.target.files);
        },

        async requestImages(index, files) {
            let fd = new FormData();
            fd.append("image", files[index]);
            console.log("file", files);
            await this.$axios({
                url: "file/create",
                method: "POST",
                data: fd,
            }).then((res) => {
                this.serial.screens.original.push(res.data.data.path);
                this.serial.screens.thumb.push(res.data.data.path);

                if (index < files.length - 1) {
                    this.requestImages(index + 1, files);
                }
            });
        },

        deleteImage(index) {
            this.serial.screens.thumb.splice(index, 1);
            this.serial.screens.original.splice(index, 1);
        },
        changeImageSlider(res, file) {
            this.thero = this.$cdn + res.data.path;
            this.serial.screens.original[0] = res.data.path;
            this.serial.screens.thumb[0] = res.data.path;
        },
        handleRemove(file, fileList) {
            console.log("fileList->", fileList);
            // console.log("file->", file);
            // let index = fileList.findIndex((item) => item == file);
        },
        async changeMultiple(file, fileList) {
            let fd = new FormData();
            fd.append("image", file.raw);

            await this.$axios({
                method: "POST",
                url: "file/create",
                data: fd,
            }).then((res) => {
                console.log(res);
                this.serial.screens.thumb.push(res.data.data.path);
                this.serial.screens.original.push(res.data.data.path);
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (
                    this.serial.image != "" &&
                    this.serial.screens.original[0] != "" &&
                    this.serial.screens.original.length > 1
                ) {
                    if (valid) {
                        this.serial.tags = this.serial.tagstring.split(" ");
                        this.$axios
                            .$post("season/add", this.serial)
                            .then((res) => {
                                this.$message({
                                    message: "Qo'shildi",
                                    type: "success",
                                    showClose: true,
                                });
                                this.$router.push("/serial");
                            });
                    } else {
                        return false;
                    }
                } else {
                    this.$message({
                        message: "Ma`lumotlarni to'liq to'ldiring",
                        type: "warning",
                        showClose: true,
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss">
.upload-button {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    border: 1px dashed #409eff;
    display: flex;
    cursor: pointer;
    margin-top: 10px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 3;
    }
    i.img-icon {
        position: absolute;
        font-size: 36px;
        color: #409eff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    i.upload-icon {
        position: absolute;
        font-size: 36px;
        color: #409eff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 7;
    }
    div.opacity {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0.9;
        z-index: 6;
        transform: scale(0);
        transition: 0s;

        button {
            cursor: pointer;
        }
    }
    input {
        position: absolute;
        opacity: 0;
        left: -10000000000px;
    }

    &:hover div.opacity {
        transform: scale(1);
    }
    &:hover i.img-icon {
        display: none;
    }
}

div.images-box {
    display: flex;
    .upload-button {
        margin-right: 10px;
    }
}

img.img-user {
    width: 20px;
    height: 20px;
}

.prefix {
    margin-top: 10px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader img {
    object-fit: cover;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>
