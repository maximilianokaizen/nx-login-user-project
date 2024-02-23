package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	LastName string `json:"lastName"`
}

func main() {
	var numMessages int
	flag.IntVar(&numMessages, "n", 10, "Number of users to create")
	flag.Parse()

	for i := 0; i < numMessages; i++ {
		user := generateRandomUser()
		jsonData, err := json.Marshal(user)
		if err != nil {
			fmt.Println("Error marshalling JSON:", err)
			continue
		}

		resp, err := http.Post("http://localhost:3000/api/users/", "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			fmt.Println("Error sending request:", err)
			continue
		}
		defer resp.Body.Close()

		fmt.Printf("User %d created with response status: %s\n", i+1, resp.Status)
	}
}

func generateRandomUser() User {
	rand.Seed(time.Now().UnixNano())
	return User{
		Email:    fmt.Sprintf("user%d@example.com", rand.Intn(10000)),
		Password: "password",
		Name:     randString(5),
		LastName: randString(7),
	}
}

func randString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}
