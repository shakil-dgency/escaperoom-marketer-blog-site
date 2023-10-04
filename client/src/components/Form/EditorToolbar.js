import React from "react";
import { Quill } from "react-quill";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
		<path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
	</svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
		<path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
	</svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
	this.quill.history.undo();
}
function redoChange() {
	this.quill.history.redo();
}

// Add sizes to whitelist and register them
const fontSizeArr = ["8px", "9px", "10px", "12px", "14px", "16px", "18px", "20px", "24px", "32px", "42px", "54px", "68px", "84px", "98px"];

const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "Inter", "lucida"];
Quill.register(Font, true);

//Custom alt and title attribute for img tag
const Image = Quill.import("formats/image");
class ImageBlot extends Image {
	static create(value) {
		const node = super.create(value);

		const [altText, imageTitle] = insertImageBlot().split(" | ");

		if (typeof value === "string") {
			node.setAttribute("alt", altText);
			node.setAttribute("title", imageTitle);
		}
		return node;
	}
}

Quill.register(ImageBlot);

//function for img alt and title attribute
var insertImageBlot = function () {
	const dialog = window.prompt("Enter alt text, image title, and select an image:", "Alternative Text | Image Title");

	return dialog;
};

// Modules object for setting up the Quill editor
export const modules = (props) => ({
	toolbar: {
		container: "#" + props,
		handlers: {
			undo: undoChange,
			redo: redoChange,
			alt: insertImageBlot,
		},
	},
	history: {
		delay: 500,
		maxStack: 100,
		userOnly: true,
	},
});

// Formats objects for setting up the Quill editor
export const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"align",
	"strike",
	"script",
	"blockquote",
	"background",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
	"color",
	"code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
	return (
		<>
			{props.toolbarId !== undefined && (
				<div id={props.toolbarId}>
					<span className="ql-formats">
						<button className="ql-bold" />
						<button className="ql-italic" />
						<button className="ql-underline" />
						<button className="ql-strike" />
					</span>
					<span className="ql-formats">
						{/* <select className="ql-font">
							<option value="arial"> Arial </option>
							<option value="comic-sans">Comic Sans</option>
							<option value="courier-new">Courier New</option>
							<option value="georgia">Georgia</option>
							<option value="helvetica">Helvetica</option>
							<option value="Inter" selected>
								Inter
							</option>
							<option value="lucida">Lucida</option>
						</select> */}
						<select className="ql-size">
							<option value="8px">8px</option>
							<option value="9px">9px</option>
							<option value="10px">10px</option>
							<option value="12px">12px</option>
							<option value="14px">14px</option>
							<option value="16px" selected>
								16px
							</option>
							<option value="18px">18px</option>
							<option value="20px">20px</option>
							<option value="24px">24px</option>
							<option value="32px">32px</option>
							<option value="42px">42px</option>
							<option value="54px">54px</option>
							<option value="68px">68px</option>
							<option value="84px">84px</option>
							<option value="98px">98px</option>
						</select>
						<select className="ql-header">
							<option value="1">Heading 1</option>
							<option value="2">Heading 2</option>
							<option value="3">Heading 3</option>
							<option value="4">Heading 4</option>
							<option value="5">Heading 5</option>
							<option value="6">Heading 6</option>
							<option value="" selected>
								Normal
							</option>
						</select>
					</span>
					<span className="ql-formats">
						<button className="ql-list" value="ordered" />
						<button className="ql-list" value="bullet" />
						<button className="ql-indent" value="-1" />
						<button className="ql-indent" value="+1" />
					</span>
					<span className="ql-formats">
						<button className="ql-script" value="super" />
						<button className="ql-script" value="sub" />
						<button className="ql-blockquote" />
						<button className="ql-direction" />
					</span>
					<span className="ql-formats">
						<select className="ql-align" />
						<select className="ql-color" />
						<select className="ql-background" />
					</span>
					<span className="ql-formats">
						<button className="ql-link" />
						<button className="ql-image" />
						<button className="ql-video" />
					</span>
					<span className="ql-formats">
						<button className="ql-formula" />
						<button className="ql-code-block" />
						<button className="ql-clean" />
					</span>
					<span className="ql-formats">
						<button className="ql-undo">
							<CustomUndo />
						</button>
						<button className="ql-redo">
							<CustomRedo />
						</button>
					</span>
				</div>
			)}
		</>
	);
};
export default QuillToolbar;
