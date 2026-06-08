import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ProjectCard.css';
function ProjectCard({ title, description, imagePath }) {
    return (_jsxs("div", { className: "project-card", children: [_jsx("div", { className: "project-image", children: _jsx("img", { src: imagePath, alt: title }) }), _jsxs("div", { className: "project-content", children: [_jsx("h3", { children: title }), _jsx("p", { children: description })] })] }));
}
export default ProjectCard;
