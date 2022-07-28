<template>
    <div>
        <div class="left-navbar">
            <div class="nav-logo">
                <h2 class="logo-title">Anibla.uz</h2>
            </div>

            <div class="nav-menu">
                <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <nuxt-link exact :to="{ name: 'index' }">
                            <span class="icon-menu">
                                <i class="el-icon-s-home"></i>
                            </span>
                            <span>Dashboard</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <nuxt-link exact :to="{ name: 'category' }">
                            <span class="icon-menu">
                                <i class="el-icon-menu"></i>
                            </span>
                            <span>Kategoriyalar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <nuxt-link exact :to="{ name: 'janr' }">
                            <span class="icon-menu">
                                <i class="el-icon-star-on"></i>
                            </span>
                            <span>Janrlar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <nuxt-link exact :to="{ name: 'member' }">
                            <span class="icon-menu">
                                <i class="el-icon-user"></i>
                            </span>
                            <span>Hodimlar</span>
                        </nuxt-link>
                    </el-menu-item>

                    <el-menu-item index="4">
                        <nuxt-link exact :to="{ name: 'film' }">
                            <span class="icon-menu">
                                <i class="el-icon-film"></i>
                            </span>
                            <span>Filmlar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <nuxt-link exact :to="{ name: 'serial' }">
                            <span class="icon-menu">
                                <i class="el-icon-video-play"></i>
                            </span>
                            <span>Seriallar</span>
                        </nuxt-link>
                    </el-menu-item>

                    <el-menu-item index="5">
                        <nuxt-link exact :to="{ name: 'sliders' }">
                            <span class="icon-menu">
                                <i class="el-icon-document-add"></i>
                            </span>
                            <span>Sliders</span>
                        </nuxt-link>
                    </el-menu-item>

                    <el-menu-item index="6">
                        <nuxt-link exact :to="{ name: 'news' }">
                            <span class="icon-menu">
                                <i class="el-icon-tickets"></i>
                            </span>
                            <span>Yangiliklar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <nuxt-link exact :to="{ name: 'annotation' }">
                            <span class="icon-menu">
                                <i class="el-icon-guide"></i>
                            </span>
                            <span>Anotatsiya</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <nuxt-link exact :to="{ name: 'comments' }">
                            <span class="icon-menu">
                                <i class="el-icon-chat-line-round"></i>
                            </span>
                            <span>Muhokamalar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <nuxt-link exact :to="{ name: 'users' }">
                            <span class="icon-menu">
                                <i class="el-icon-user-solid"></i>
                            </span>
                            <span>Foydalanuvchilar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <nuxt-link exact :to="{ name: 'price' }">
                            <span class="icon-menu">
                                <i class="el-icon-s-operation"></i>
                            </span>
                            <span>Narxlar</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-menu-item index="10">
                        <nuxt-link exact :to="{ name: 'payment' }">
                            <span class="icon-menu">
                                <i class="el-icon-s-finance"></i>
                            </span>
                            <span>To`lovlar</span>
                        </nuxt-link>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <header>
            <div class="header-inner">
                <div class="header-left flex"></div>

                <div class="header-right" @click="logOut2">
                    <div class="news flex">
                        <button @click="toggleFullScreen()">
                            <span class="el-icon-rank"></span>
                        </button>
                    </div>

                    <el-dropdown>
                        <div class="flex">
                            <span class="profil">
                                <img
                                    :src="
                                        $store.state.uploads +
                                        $store.state.auth.user.photo
                                    "
                                    alt
                                />
                            </span>
                            <span class="el-dropdown-link">
                                {{ $store.state.auth.user.name }}
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user">
                                <nuxt-link :to="{ name: `admin-profil` }"
                                    >Profile</nuxt-link
                                >
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-s-tools"
                                >Settings</el-dropdown-item
                            >

                            <el-dropdown-item
                                class="danger-text"
                                icon="el-icon-switch-button"
                                divided
                                ><button @click="logout">
                                    Log out
                                </button></el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
        };
    },
    mounted() {
        var elem = document.documentElement;
        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE11 */
                elem.msRequestFullscreen();
            }
        }
    },
    methods: {
        async logout() {
            await this.$auth.logout();
            this.$router.go();
        },
        toggleFullScreen() {
            alert("ok");
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
    margin: 0 5px;
    cursor: pointer;
}

.header-left {
    .search {
        margin-left: 10px;
    }
    a {
        font-size: 28px;
        color: #000;
    }
}
.header-right {
    .profil {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .news {
        margin-right: 20px;
        button {
            cursor: pointer;
            font-size: 20px;
            span {
                font-weight: bold;
            }
        }
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
