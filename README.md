<h1 align="left">
    <a">My blog</a>
</h1>

> Project status: Completed :heavy_check_mark:

![Captura de tela de 2023-05-30 04-35-14](https://github.com/Icegreeen/my-blog/assets/56550632/3081b31d-c84f-4073-a1b2-4c5693dd4cd6)
![Captura de tela de 2023-05-30 04-38-25](https://github.com/Icegreeen/my-blog/assets/56550632/40011cd8-320f-4c2d-86c0-2e99dc522c41)
![Captura de tela de 2023-05-30 04-52-09](https://github.com/Icegreeen/my-blog/assets/56550632/7a8e7769-1af6-4656-8410-c895d5d3860e)
                                  
# :pushpin: Table of Contents

* [Running Locally](#construction_worker-running-locally)
* [FAQ](#postbox-faq)
* [Issues](#bug-issues)
* [Contributing](#tada-contributing)

## :construction_worker: Running Locally

Disclaimer: This project fetches data from my personal [GraphCMS](https://graphcms.com/) workspace, thus it's necessary to define the CMS endpoint as a environment variable, otherwise it's not possible to fully execute the scripts bellow

#### Clone repository
```bash
git clone https://github.com/Icegreeen/my-blog.git
```

#### Define environment variables
```bash
cp .env.local.example .env.local
```

#### Install dependencies & execute web application in development mode
```bash
yarn
yarn dev
```

Define the environment variables by creating a .env.local file similar to [.env.local.example](https://github.com/Icegreeen/my-blog.git.env.local.example)

# :postbox: Faq

**Question:** What are the technologies used in this project?

**Answer:** [Next.js](https://nextjs.org/), [Styled Component](https://styled-components.com/) and [GraphCMS](https://graphcms.com/)

**Question** Why Next.js instead of other frameworks of React out there?

**Answer** I chose Next.js in order to opt out for different rendering strategies

# :bug: Issues

Feel free to **file a new issue** with a respective title and description. If you already found a solution to your problem, **I would love to review your pull request**!

# :tada: Contributing

Check out the [contributing](https://github.com/Icegreeen/my-blog/blob/main/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing



