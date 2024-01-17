const puppeteer = require('puppeteer');

// const URL_TEST = "http://10.109.37.182:26300/api/v1/health";
const URL_MYVODAFONE_MOBIL = "http://localhost:8080/myvodafone/mobil";
const URL_MYVODAFONE = "http://localhost:8080/myvodafone";
const URL_404_NOT_FOUND = "http://localhost:8080/shop/404";
const URL_TEST = "http://localhost:8080/c/portal/login";
const URL_O_PROBE = "http://localhost:8080/o/probe";
const DEVICES = "http://localhost:8080/shop/okostelefonok?brand=\"Apple\"";

const pagesSize = 20;

function delay(time) {
	return new Promise(function(resolve) {
		setTimeout(resolve, time)
	});
}

async function openPageBrowser(browser, i, url_redirect) {
	for (let j = 1; j < pagesSize; j++) {
		console.log('Create new browser page. Iteration: ' + i + ' page number: ' + j);
		pages = [];
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		pages.push(await browser.newPage());
		console.log('Go to page: ' + url_redirect + '. Iteration: ' + i + ' page number: ' + j);
		for (let k = 0; k < pages.length; k++) {
			await pages[k].goto(url_redirect);
		}
		// console.log('Close page. Iteration: ' + i + ' page number: ' + j);
		const iterations = 1000000;
		let iter = 1;
		while (i < iterations) {
			console.log('Reloading page. Iteration: ' + iter + ' page number: ' + j);
			for (let k = 0; k < pages.length; k++) {
				pages[k].reload();
			}
			iter++;
		}
		//await page.close();
	}
}

async function testRun(url_redirect) {
    console.log('Start browser');
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
		ignoreHTTPSErrors: true
    });
	const iterations = 30;
	let i = 1;
	const page = await browser.newPage();
	await page.goto(url_redirect);
	while (i < iterations) {
		await openPageBrowser(browser, i, url_redirect)
		i++;
	}
	// await delay(400000);
    // console.log('Шаг 1: ввод часов и минут');
    // const hoursInput = await page.$('#form-input-hour');
    // await hoursInput.type('08');
    // const minutesInput = await page.$('#form-input-minute');
    // await minutesInput.type('00');
    // console.log('Шаг 2: заполнение поля Откуда');
    // const fromInput = await page.$('#form-input-from');
    // await fromInput.type('Усачева, 3');
    // console.log('Шаг 3: заполнение поля Куда');
    // const toInput = await page.$('#form-input-to');
    // await toInput.type('Комсомольский проспект, 18');
    // console.log('Шаг 4: выбор режима Свой');
    // const routeMode = await page.$('#form-mode-custom');
    // await routeMode.click();
    // console.log('Шаг 5: выбор вида транспорта');
    // const typeOfTransport = await page.$('#from-type-taxi');
    // await typeOfTransport.click();
    // console.log('Ожидание элемента с результатом');
    // await page.waitForSelector('#result-time-price')
    // console.log('Получение строки с результатом');
    // const text = await page.$eval('#result-time-price', element => element.textContent);
    // console.log('Проверка условия тест-кейса');
    // if (text.startsWith('Такси')) {
        // console.log('Успех. Текст содержит: ' + text);
    // } else {
        // console.log(`Ошибка. Текст не начинается со слова 'Такси'`)
    // }
    console.log('Closing browser');
    await browser.close();
}

// testRun(URL_MYVODAFONE_MOBIL);
// testRun(URL_MYVODAFONE);
// testRun(URL_404_NOT_FOUND);
testRun(DEVICES);

