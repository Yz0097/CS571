function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    const job_list = Array.from(document.getElementsByName('job'));
    if(job_list.some(job=> job.checked)){
      let job = job_list.filter(job => job.checked)[0].value;
      alert("Thank you for apply a " + job);
    }else{
      alert("Please select a job!");
    }
}