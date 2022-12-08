<script>
    import axios from "axios";

    import { querystring } from "svelte-spa-router";

    // TODO: Setze hier die URL zu deinem mit Postman erstellten Mock Server
    //const api_root = "https://33fdd60f-b14a-4f87-a6b3-9694b77c1593.mock.pstmn.io";
    const api_root = "http://localhost:8080";

    let currentPage;
    let nrOfPages = 0;

    let freelancers = [];
    let freelancer = {
        description: null,
        earnings: null,
        freelancerType: null,
    };

    $: {
        let searchParams = new URLSearchParams($querystring);
        if (searchParams.has("page")) {
            currentPage = searchParams.get("page");
        } else {
            currentPage = "1";
        }
        getFreelancers();
    }

    function getFreelancers() {
        let query = "pageSize=4&page=" + currentPage;

        var config = {
            method: "get",
            url: api_root + "/api/freelancer?" + query,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                freelancers = response.data.content;
                nrOfPages = response.data.totalPages;
            })
            .catch(function (error) {
                alert("Could not get freelancers");
                console.log(error);
            });
    }

    function createFreelancer() {
        var config = {
            method: "post",
            url: api_root + "/api/freelancer",
            headers: {
                "Content-Type": "application/json",
            },
            data: freelancer,
        };

        axios(config)
            .then(function (response) {
                alert("Freelancer created");
                getFreelancers();
            })
            .catch(function (error) {
                alert("Could not create Freelancer");
                console.log(error);
            });
    }
</script>

<h1 class="mt-3">Create Freelancer</h1>
<form class="mb-5">
    <div class="row mb-3">
        <div class="col">
            <label class="form-label" for="description">Name</label>
            <input
                bind:value={freelancer.name}
                class="form-control"
                id="description"
                type="text"
            />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col">
            <label class="form-label" for="description">Email</label>
            <input
                bind:value={freelancer.email}
                class="form-control"
                id="description"
                type="text"
            />
        </div>
    </div>
    <button type="button" class="btn btn-primary" on:click={createFreelancer}
        >Submit</button
    >
</form>

<h1>All Freelancers</h1>

<!--
<div class="row my-3">
    <div class="col-auto">
        <label for="" class="col-form-label">Earnings: </label>
    </div>
    <div class="col-3">
        <input
            class="form-control"
            type="number"
            placeholder="from"
            bind:value={earningsMin}
        />
    </div>
    <div class="col-3">
        <input
            class="form-control"
            type="number"
            placeholder="to"
            bind:value={earningsMax}
        />
    </div>
    <div class="col-3">
        <button class="btn btn-primary" on:click={getFreelancers}>Apply</button>
    </div>
</div>
-->
<table class="table">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
        </tr>
    </thead>
    <tbody>
        {#each freelancers as freelancer}
            <tr>
                <td>{freelancer.name}</td>
                <td>{freelancer.email}</td>                
            </tr>
        {/each}
    </tbody>
</table>

<nav>
    <ul class="pagination">
        {#each Array(nrOfPages) as _, i}
            <li class="page-item">
                <a
                    class="page-link"
                    class:active={currentPage == i + 1}
                    href={"#/freelancers?page=" + (i + 1)}
                    >{i + 1}
                </a>
            </li>
        {/each}
    </ul>
</nav>
