package main

import (
	"fmt"
	"net/http"

	"todo-api/controller"
	"todo-api/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var container *Container

func init() {
	container = &Container{}

	container.router = gin.New()

	container.router.Use(cors.Default())

	container.serverConfig = models.InitConfig()

	if container.serverConfig == nil {
		panic("failed to parse config")
	}
	dbconf := container.serverConfig.Server.DB
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbconf.User,
		dbconf.Password,
		dbconf.Hostname,
		dbconf.Port,
		dbconf.Schema,
	)
	

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	container.db = db

}

func main() {
	container.getRouter().POST("goal/", func(routerContex *gin.Context) {
		data, err := controller.Create(routerContex, container.getDb())
		if err != nil {
			fmt.Println(fmt.Errorf("%s", err))
		}

		routerContex.JSON(http.StatusOK, gin.H{
			"id": data,
		})

	})

	container.getRouter().GET("/goal", func(routerContex *gin.Context) {
		data, err := controller.Get(routerContex, container.getDb())
		if err != nil {
			fmt.Println(fmt.Errorf("%s", err))
		}
		routerContex.JSON(http.StatusOK, gin.H{
			"goals": data,
		})
	})

	container.getRouter().GET("/goal/:id", func(routerContex *gin.Context) {
		data, err := controller.GetById(routerContex, container.getDb())
		if err != nil {
			fmt.Println(fmt.Errorf("%s", err))
		}
		routerContex.JSON(http.StatusOK, gin.H{
			"goal": data,
		})
	})

	container.getRouter().Run(fmt.Sprintf("%s:%s", container.getServerConfig().Server.Hostname, container.getServerConfig().Server.Port))
}

/*
NOTES: Not sure how much this matters but having this here
allows for the attributes to be private to the package and assigned here.
If I move this to another package they will need to be public (exported).
When doing that it would allow values to be overwritten...
*/
type Container struct {
	router       *gin.Engine
	db           *gorm.DB
	serverConfig *models.Config
}

func (container *Container) getRouter() *gin.Engine {
	return container.router
}

// TODO: Wanted to hand out transactions func (container *Container) getDbTransaction(f func(tx *gorm.DB) error) *gorm.DB {
func (container *Container) getDb() *gorm.DB {
	return container.db
}

func (container *Container) getServerConfig() *models.Config {
	return container.serverConfig
}
