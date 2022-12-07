package persistence

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	ID          int64
	Name        string
	MilestoneID int64
	Duration    int
	Effort      int
}

type Milestone struct {
	gorm.Model
	ID     int64
	Name   string
	GoalID int64
	Tasks  []Task
}

type Goal struct {
	gorm.Model
	ID         int64
	Name       string
	Milestones []Milestone
}
