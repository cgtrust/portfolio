import React from "react";
import StackIcon from "tech-stack-icons";

const TechStack = ({ technologies }) => {
    return (
        // Grabs the API from WordPress ACF value and label array
        <div className="tech-stack">
            {technologies.map((tech, index) => (
                <div id={tech.label} key={index}>
                    <StackIcon name={tech.value} />
                    <span>{tech.label}</span>
                </div>
            ))}
        </div>
    );
};

export default TechStack;
