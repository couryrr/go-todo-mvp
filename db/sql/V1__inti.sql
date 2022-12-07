CREATE TABLE goals (
    id bigint primary key auto_increment,
    name varchar(255) not null,
    created_at datetime,
    updated_at datetime,
    deleted_at datetime
);

CREATE TABLE milestones (
    id bigint primary key auto_increment,
    goal_id bigint,
    name varchar(255) not null,
    created_at datetime,
    updated_at datetime,
    deleted_at datetime,
    foreign key (goal_id) references goals(id)
);

CREATE TABLE tasks (
    id bigint primary key auto_increment,
    milestone_id bigint,
    name varchar(255) not null,
    duration bigint not null,
    effort bigint,
    created_at datetime,
    updated_at datetime,
    deleted_at datetime,
    foreign key (milestone_id) references milestones(id)
)