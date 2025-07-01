<script lang="ts">
	type Project = Set<Stage>;

	type QuestionType = string | boolean | number;
	type Question = { question: string; type: QuestionType; required: Boolean };
	type Stage = {
		created: Date;
		name: string;
		description: string;
		updated: Date;
		questions: Question[];
		id: ID;
	};
    

	type Task = {
		created: Date;
		updated: Date;
		name: string;
		description: string;
		id: ID;
		answers: Answers[];
	};

	type Answers = Array<string | boolean | number>;
	type ID = string | number;

    type ProgressRequest = {
    }

	const makJam: Stage = {
		created: new Date(),
		description: 'Make some jam yo',
		id: Math.random(),
		name: 'makeJam',
		updated: new Date()
	};

	const makTin: Stage = {
		created: new Date(),
		description: 'Make some tin yo',
		id: Math.random(),
		name: 'makeTin',
		updated: new Date()
	};

	const jamInTin: Stage = {
		created: new Date(),
		description: 'Put some jam in tin yo',
		id: Math.random(),
		name: 'Jam in Tin Sir',
		updated: new Date()
	};

	const packagetins: Stage = {
		created: new Date(),
		description: 'Put some package in my tin yo',
		id: Math.random(),
		name: 'package tine',
		updated: new Date()
	};

	const mineProject: Project = new Set([packagetins, makJam, makTin, jamInTin]);
</script>
