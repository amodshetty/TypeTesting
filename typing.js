let lessonsArray = ["Let us now look deep into what are objects. All these objects have a state and a behavior.","If we consider a dog, then its state is - name, breed, color, and the behavior.","If you compare the software object with a real-world object, they have very similar characteristics.","Software objects also have a state and a behavior. A software object's state is stored in fields.","So in software development, methods operate on the internal state of an object and the object-to-object.","In addition to collections, the framework defines several map interfaces and classes. Maps store key/value pairs.","A constructor initializes an object when it is created. It has the same name as its class and is syntactically similar to a method."];
let originalTextTag=document.querySelector('#original-text');
let textAreaBoxTag=document.querySelector('#text-area');
let secondsTag=document.querySelector('#seconds');
let minutesTag=document.querySelector('#minutes');
let milliSecondsTag=document.querySelector('#m-seconds');
let minutes=0;
let seconds=0;
let milliSeconds=0;
let count=0;
let timerRunning=false;
let congratsSection=document.querySelector('.cong-section');
let claps = document.querySelector("#claps");
let interval=null;


let startTimer=()=>
{

	count++;
	minutes=Math.floor((count/100)/60);
	seconds=Math.floor((count/100)-(minutes*60));
	milliSeconds=Math.floor(count-(seconds*100)-(minutes*6000));

	minutesTag.innerText=leadingZero(minutes);
	secondsTag.innerText=leadingZero(seconds);
	milliSecondsTag.innerText=leadingZero(milliSeconds);
}

let leadingZero=(time)=>
{
	if(time<10)
	{
		return '0'+time;
	}
	else
	{
		return time;
	}
}

textAreaBoxTag.addEventListener('keyup',function()
{
	let textEnteredLength=textAreaBoxTag.value.length;
	if(textEnteredLength=== 1 && !timerRunning)
	{
		interval=setInterval(startTimer,10);
		timerRunning=true;

	}
	let originalText=originalTextTag.innerText;
	let textEntered=textAreaBoxTag.value;
	let partialText=originalText.substr(0,textEntered.length);
	evaluateText(originalText,textEntered,partialText);
});

let evaluateText=(originalText,textEntered,partialText)=>
{
	if(textEntered==='')
	{
		applyColors('grey');
	}
	else
	{
		if(originalText===textEntered)
	{
		applyColors('green');
		claps.play();
		congratsSection.style.display='block';
		clearInterval(interval);
	}
	else
	{
		if(textEntered===partialText)
		{
			applyColors('blue');
		}
		else
		{
			applyColors('red');
		}
	}
	}
}

let applyColors=(color)=>
{
	textAreaBoxTag.style.borderColor=color;
	textAreaBoxTag.style.boxShadow=`0 0 10px ${color}`;
}

let changeText=(index)=>
{
	let lessonText=lessonsArray[index];
	originalTextTag.innerText=lessonText;
}

let resetBtn=document.querySelector('#reset');
resetBtn.addEventListener('click',function()
{	
	minutes=0;
	seconds=0;
	milliSeconds=0;
	count=0;
	clearInterval(interval);
	document.querySelector('#minutes').innerText='00';
	document.querySelector('#seconds').innerText='00';
	document.querySelector('#m-seconds').innerText='00';
});
