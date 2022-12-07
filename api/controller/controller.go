package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"todo-api/models"
	"todo-api/persistence"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Create(routerContex *gin.Context, db *gorm.DB) (int64, error) {
	goal := models.Goal{}

	if err := routerContex.BindJSON(&goal); err != nil {
		routerContex.AbortWithError(http.StatusBadRequest, err)
		return 0, nil
	}

	goalEntity := persistence.Goal{Name: goal.Name}

	for _, milestone := range goal.Milestones {
		milestoneEntity := persistence.Milestone{Name: milestone.Name}
		for _, task := range milestone.Tasks {
			taskEntity := persistence.Task{
				Name:     task.Name,
				Duration: task.Duration,
				Effort:   task.Effort,
			}
			milestoneEntity.Tasks = append(milestoneEntity.Tasks, taskEntity)
		}

		goalEntity.Milestones = append(goalEntity.Milestones, milestoneEntity)

	}

	result := db.Create(&goalEntity)

	if result.Error != nil {
		return 0, result.Error
	}

	return goalEntity.ID, nil
}

func GetById(routerContex *gin.Context, db *gorm.DB) (*persistence.Goal, error) {
	goal := persistence.Goal{}
	id := routerContex.Param("id")
	result := db.Preload("Milestones.Tasks").First(&goal, id)

	if result.Error != nil {
		return nil, result.Error
	}

	fmt.Println(goal)

	return &goal, nil
}

func Get(routerContex *gin.Context, db *gorm.DB) ([]persistence.Goal, error) {
	goals := []persistence.Goal{}
	skip, err := strconv.Atoi(routerContex.Query("skip"))
	if err != nil {
		skip = 0
	}

	fmt.Println(skip)

	take, err := strconv.Atoi(routerContex.Query("take"))

	if err != nil {
		take = 10
	}

	fmt.Println(take)

	result := db.Preload("Milestones.Tasks").Offset(skip * take).Limit(take).Find(&goals)

	if result.Error != nil {
		return nil, result.Error
	}

	fmt.Println(goals)

	return goals, nil
}
