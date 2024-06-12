import React from "react";
import StackIcon from "tech-stack-icons";

const TechStack = ({ technologies }) => {
    return (
        <div>
            {technologies.map((tech, index) => (
                typeof tech === 'object' && tech.value ? (
                    <StackIcon key={index} name={tech.value} />
                ) : (
                    <div key={index}>Invalid technology: {JSON.stringify(tech)}</div>
                )
            ))}
        </div>
    );
}

export default TechStack;
