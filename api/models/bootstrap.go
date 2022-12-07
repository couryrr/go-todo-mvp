package models

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Server struct {
		// Host is the local machine IP Address to bind the HTTP Server to
		Hostname string `yaml:"hostname"`

		// Port is the local machine TCP Port to bind the HTTP Server to
		Port string `yaml:"port"`
		DB   struct {
			User     string `yaml:"user"`
			Password string `yaml:"password"`
			Hostname string `yaml:"hostname"`
			Port     string `yaml:"port"`
			Schema   string `yaml:"schema"`
		} `yaml:"db"`
	} `yaml:"server"`
}

func InitConfig() *Config {
	// TODO: Adjust this to work locally. Might not be needed since we are in docker.
	f, err := os.Open("/sbin/config/config.yaml")

	if err != nil {
		fmt.Println(err)
		return nil
	}

	defer f.Close()

	decoder := yaml.NewDecoder(f)

	config := Config{}

	err = decoder.Decode(&config)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	return &config
}
