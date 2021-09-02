input:hover {
	filter: brightness(0.9);
}
.btn_class:hover {
	filter: brightness(0.9);
}
p {
  user-select: all;
}
input[id=search] {
	width: 100%;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 6px;
	background-color: white;
	background-image: url('icons/Search.svg');
	background-position: 4px 8px;
	background-repeat: no-repeat;
	padding: 8px 8px 8px 24px;
}
input[id=pickActive] {
	background-color: #4E9B9B;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=reason] {
	background-color: white;
	box-sizing: border-box;
	border: 2px solid #ccc;
	border-radius: 6px;
	background-position: 14px 14px;
	background-repeat: no-repeat;
	padding: 8px 8px;
}
input[id=activate] {
	background-color: #99CCCC;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=suspend] {
	background-color: #4E9B9B;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=close] {
	background-color: #99CCCC;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=closeDEP] {
	background-color: #4E9B9B;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=closeDMA] {
	background-color: #99CCCC;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=pickGroup] {
	background-color: #4E9B9B;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=assign] {
	background-color: #99CCCC;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=removeGr] {
	background-color: #4E9B9B;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
input[id=clearFlags] {
	background-color: #99CCCC;
	color: white;
	border-radius: 6px;
	padding: 8px 8px;
}
.loader {
	border: 5px solid #f3f3f3;
	border-radius: 50%;
	border-top: 5px solid gray;
	padding: 8px 16px;
	margin: auto;
	width: 40px;
	height: 40px;
	-webkit-animation: spin 1s linear infinite;
	animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
	0% { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
p {
	text-align: center;
	font-size: 14px;
}
