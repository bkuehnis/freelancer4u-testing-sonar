<script>
    import axios from "axios";
	import {onMount} from 'svelte';

    import { querystring } from "svelte-spa-router";

    // TODO: Setze hier die URL zu deinem mit Postman erstellten Mock Server
    //const api_root = "https://487a64c2-2db2-4ccb-aeed-afa06dd923bb.mock.pstmn.io";
    const api_root = "http://localhost:8080";

    let unternehmenId;
    let modal;
    let currentPage;
    let nrOfPages = 0;

    let earningsMin, earningsMax;

    let jobs = [];
    let job = {
        description: null,
        earnings: null,
        jobType: null,
    };

    $: {
        let searchParams = new URLSearchParams($querystring);
        if (searchParams.has("page")) {
            currentPage = searchParams.get("page");
        } else {
            currentPage = "1";
        }
        getJobs();

       
    }

    function getJobs() {
        let query = "pageSize=4&page=" + currentPage;

        if (earningsMin) {
            query += "&min=" + earningsMin;
        }

        if (earningsMax) {
            query += "&max=" + earningsMax;
        }

        var config = {
            method: "get",
            url: api_root + "/api/job?" + query,
            headers: {},
        };

        axios(config)
            .then(function (response) {
                jobs = response.data.content;
                nrOfPages = response.data.totalPages;
            })
            .catch(function (error) {
                alert("Could not get jobs");
                console.log(error);
            });
    }

    function createJob() {
        var config = {
            method: "post",
            url: api_root + "/api/job",
            headers: {
                "Content-Type": "application/json",
            },
            data: job,
        };

        axios(config)
            .then(function (response) {
                alert("Job created");
                getJobs();
            })
            .catch(function (error) {
                alert("Could not create Job");
                console.log(error);
            });
    }

        
    function addJob(identification){
        //document.querySelector('#exampleModalCenter').focus();
        unternehmenId = identification;
        modal.focus();
        console.log(modal);
        document.getElementById("exampleModalCenter").classList.add("show");
    }

</script>

<h1 class="mt-3">Create Job</h1>
<form class="mb-5">
    <div class="row mb-3">
        <div class="col">
            <label class="form-label" for="description">Description</label>
            <input
                bind:value={job.description}
                class="form-control"
                id="description"
                type="text"
            />
        </div>
    </div>
    <div class="row mb-3">
        <div class="col">
            <label class="form-label" for="type">Type</label>
            <select
                bind:value={job.jobType}
                class="form-select"
                id="type"
                type="text"
            >
                <option value="OTHER">OTHER</option>
                <option value="TEST">TEST</option>
                <option value="IMPLEMENT">IMPLEMENT</option>
                <option value="REVIEW">REVIEW</option>
            </select>
        </div>
        <div class="col">
            <label class="form-label" for="earnings">Earnings</label>
            <input
                bind:value={job.earnings}
                class="form-control"
                id="earnings"
                type="number"
            />
        </div>
    </div>
    <button type="button" class="btn btn-primary" on:click={createJob}
        >Submit</button
    >
</form>

<h1>All Jobs</h1>

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
        <button class="btn btn-primary" on:click={getJobs}>Apply</button>
    </div>
</div>

<table class="table">
    <thead>
        <tr>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Earnings</th>
            <th scope="col">State</th>
            <th scope="col">FreelancerId</th>
            <th scope="col">Comment</th>
            <th scope="col">add</th>
        </tr>
    </thead>
    <tbody>
        {#each jobs as job}
            <tr>
                <td>{job.description}</td>
                <td>{job.jobType}</td>
                <td>{job.earnings}</td>
                <td>{job.jobState}</td>
                <td>{job.freelancerId}</td>
                <td>{job.comment}</td>
                <td
                    ><!-- Button trigger modal -->
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        on:click={addJob(job.id)}
                    >
                        add stuff
                    </button></td
                >
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
                    href={"#/jobs?page=" + (i + 1)}
                    >{i + 1}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<!-- Modal -->
<div
    class="modal"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
    bind:this={modal}
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
                </h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">Close</button
                >
                <button type="button" class="btn btn-primary"
                    >Save changes</button
                >
            </div>
        </div>
    </div>
</div>
