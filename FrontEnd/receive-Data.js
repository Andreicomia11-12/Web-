document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const ul = document.querySelector(".list-group");
  
    // Fetch and render workouts
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/workout/");
        const workouts = await response.json();
  
        // Clear the list before appending to avoid duplication
        ul.innerHTML = "";
        workouts.reverse().forEach((workout) => {
          addWorkoutToList(workout);
        });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
  
    // Add a single workout to the list
    const addWorkoutToList = ({ _id, title, reps, load }) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
  
      const workoutTitle = document.createElement("h4");
      workoutTitle.textContent = title;
  
      const workoutDetails = document.createElement("p");
      workoutDetails.textContent = `Reps: ${reps}, Load: ${load}`;
  
      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "btn btn-warning btn-sm me-2";
      editButton.addEventListener("click", () => editWorkout(_id, title, reps, load));
  
      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "btn btn-danger btn-sm";
      deleteButton.addEventListener("click", () => deleteWorkout(_id, li));
  
      li.append(workoutTitle, workoutDetails, editButton, deleteButton);
      ul.prepend(li); // Add the newest workout at the top
    };
  
    // Handle form submission (POST)
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const title = document.querySelector("input[aria-describedby='emailHelp']").value;
      const reps = document.querySelector(".form-input1").value;
      const load = document.querySelector(".form-input2").value;
  
      if (!title || !reps || !load) {
        alert("Please fill out all fields!");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/workout/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, reps, load }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          addWorkoutToList(data); // Add the new workout dynamically
          form.reset(); // Clear form fields
          alert("Workout created successfully!");
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error submitting workout:", error);
        alert("Failed to create workout. Please try again later.");
      }
    });
  
    // Handle workout deletion (DELETE)
    const deleteWorkout = async (id, listItem) => {
      if (!confirm("Are you sure you want to delete this workout?")) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/workout/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          listItem.remove(); // Remove from the UI
          alert("Workout deleted successfully!");
        } else {
          alert("Failed to delete workout.");
        }
      } catch (error) {
        console.error("Error deleting workout:", error);
        alert("Failed to delete workout. Please try again later.");
      }
    };
  
    // Handle workout editing (PATCH)
    const editWorkout = async (id, currentTitle, currentReps, currentLoad) => {
      const newTitle = prompt("Enter new title:", currentTitle) || currentTitle;
      const newReps = prompt("Enter new reps:", currentReps) || currentReps;
      const newLoad = prompt("Enter new load:", currentLoad) || currentLoad;
  
      try {
        const response = await fetch(`http://localhost:5000/api/workout/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle, reps: newReps, load: newLoad }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Workout updated successfully!");
          // Update the workout in the DOM without re-fetching
          const listItem = [...ul.children].find((li) => li.textContent.includes(currentTitle));
          if (listItem) {
            listItem.querySelector("h4").textContent = newTitle;
            listItem.querySelector("p").textContent = `Reps: ${newReps}, Load: ${newLoad}`;
          }
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error updating workout:", error);
        alert("Failed to update workout. Please try again later.");
      }
    };
  
    // Load workouts on page load
    fetchWorkouts();
  });
  