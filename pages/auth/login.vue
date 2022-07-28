<template>
    <div>
        <div class="login-page">
            <div class="login-form">
                <h3>Kirish</h3>

                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm"
                >
                    <div class="form">
                        <el-form-item label="Login" prop="name">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>

                        <el-form-item label="Password" prop="pass">
                            <el-input
                                type="password"
                                v-model="ruleForm.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item>
                        <el-button
                            type="primary"
                               @click="loginUser"
                            >Kirish</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'empty',
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
                email: "",
                password: ""
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: "Loginni kiriting",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 20,
                        message: "Length should be 3 to 5",
                        trigger: "blur"
                    }
                ],
                password: [{ validator: validatePass, trigger: "blur" }]
            }
        };
    },
     mounted() {
  },
    methods: {
   
    async loginUser() {
    //   this.$v.ruleForm.$touch();

          console.log(this.ruleForm)

        try {
          let response = await this.$auth.loginWith("local", {
            data: this.ruleForm
          });

        //   let user = this.$auth.user;

        //   if (user.type == "user") {
        //     this.$auth.logout();
        //   }

        } catch (err) {
            console.log('error')
        //   this.$toast.error("Login yoki parol noto'gri");
        }
    }
  }
  
};
</script>

<style lang="scss" scoped>
.login-page {
    width: 100%;
    height: 100vh;
    background: #d2d6de;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
        width: 360px;
        border-radius: 5px;
        background: #fff;
        padding: 20px;
        .el-form-item {
            margin-bottom: 10px !important;
            button {
                width: 100%;
            }
        }
        h3 {
            text-align: center;
            margin-bottom: 20px;
        }
        .form {
            margin-bottom: 20px;
        }
    }
}
</style>
