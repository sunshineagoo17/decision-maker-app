import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import HeroImg from "./assets/images/decision-maker-hero.jpg";
import "./App.scss";

function DecisionMaker() {
  const [names, setNames] = useState(["Magda", "Xander"]); // Initial names
  const [activities, setActivities] = useState(["Go Out", "Stay In"]); // Initial activities
  const [decision, setDecision] = useState("");
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const handleDecision = () => {
    if (names.length === 0) {
      alert("Bruh, you gotta add a name. I'm working my butt off here. Help me out.");
      return;
    }
    if (names.length === 1) {
      alert("Bruh, you gotta add more than one name. Das cheating.");
      return;
    }
    if (activities.length === 1) {
      alert("Bruh, you gotta add more than one activity. Das cheating.");
      return;
    }
    if (activities.length === 0) {
      alert("Don't be such a couch potato. Add an activity!");
      return;
    }

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    setDecision(`${randomName} gets to decide to do this activity: ${randomActivity}`);
    setShakeAnimation(true); // Trigger the shake animation
    setTimeout(() => setShakeAnimation(false), 500); // Reset shake animation after 500ms
  };

  const handleNameChange = (index, newName) => {
    const updatedNames = [...names];
    updatedNames[index] = newName;
    setNames(updatedNames);
  };

  const handleActivityChange = (index, newActivity) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = newActivity;
    setActivities(updatedActivities);
  };

  const handleKeyPress = (e, index, type) => {
    if (e.key === "Enter") {
      type === "name" ? handleNameChange(index, e.target.value) : handleActivityChange(index, e.target.value);
    }
  };

  const deleteName = (index) => {
    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);
  };

  const deleteActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  const addName = () => {
    const newName = prompt('Enter a new name:');
    if (newName) {
      setNames([...names, newName]);
    }
  };

  const addActivity = () => {
    const newActivity = prompt('Enter a new activity:');
    if (newActivity) {
      setActivities([...activities, newActivity]);
    }
  };

  return (
    <div className="decision-maker">
      <img
        src={HeroImg}
        alt="little family"
        className={shakeAnimation ? "hero-img shake" : "hero-img"}
      />
      <h1>Decision Maker</h1>
      <div className="decision-maker-container">
        <div className="input-container">
          {names.map((name, index) => (
            <div key={index} className="input-item">
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, index, 'name')}
              />
              <button onClick={() => deleteName(index)} className="delete-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button className="add-name-button" onClick={addName}>Add Name</button>
        </div>
        <div className="input-container">
          {activities.map((activity, index) => (
            <div key={index} className="input-item">
              <input
                type="text"
                value={activity}
                onChange={(e) => handleActivityChange(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, index, 'activity')}
              />
              <button onClick={() => deleteActivity(index)} className="delete-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button className="add-activity-button" onClick={addActivity}>Add Activity</button>
        </div>
      </div>
      <button id="decision-button" className="decision-button" onClick={handleDecision}>Make Decision</button>
      {decision && <p className="decision-text">{decision}</p>}
    </div>
  );
}

export default DecisionMaker;
