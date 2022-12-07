package models

type Goal struct {
	Id         int64       `json:"id,omitempty"`
	Name       string      `json:"name"`
	Milestones []Milestone `json:"milestones"`
}

type Milestone struct {
	Id    int64  `json:"id,omitempty"`
	Name  string `json:"name"`
	Tasks []Task `json:"tasks"`
}

type Task struct {
	Id       int64  `json:"id,omitempty"`
	Name     string `json:"name"`
	Duration int    `json:"duration"`
	Effort   int    `json:"effort"`
}
