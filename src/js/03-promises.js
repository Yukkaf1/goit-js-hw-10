	const formEl = document.querySelector('.form');
	let userDelay = null;
	let userStep = null;
	let userAmount = null;
	

	function createPromise(position, delay) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      const shouldResolve = Math.random() > 0.3;
	      if (shouldResolve) {
	        resolve({ position, delay });
	      } else {
	        reject({ position, delay });
	      }
	    }, delay);
	  });
	}
	
	const onForm = e => {
	  e.preventDefault();

	  const {delay, step, amount} = e.currentTarget;
	
	//   console.log(delay.value);

	  userDelay = Number(delay.value);
	  userStep = Number(step.value);
	  userAmount = Number(amount.value);

	//   console.log(userAmount);
	
	  for (let i = 1; i <= userAmount; i++) {
    //   console.log('цикл')
	    createPromise(i, userDelay)
	      .then(({ position, delay }) => {
	        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
	      })
	      .catch(({ position, delay }) => {
	       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
	      });
	
		  userDelay += userStep;
	  }
	  e.currentTarget.reset();
	};
	

	formEl.addEventListener('submit', onForm);
