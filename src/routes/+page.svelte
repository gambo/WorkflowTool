<script lang="ts">
	import { linear } from 'svelte/easing';

	interface LineInterface {
		name: ID;
		steps: Step[];
		stations: Station[];
		unit: Unit;
	}

	type FormType = string | boolean | number;
	type Form = { question: string; type: FormType; required: Boolean };
	type Station = {
		// simplifying for now. just want to get it working
		// any for now
		data: any;
		id: ID;
	};

	type Step = {
		step_current: ID;
		step_next: ID;
		execute: (u: Unit, s: Station) => Unit;
	};

	// A unit goes through a line. changes to the unit happen at stations.
	// easy peasy
	// you here?
	// i was looking for the "Shaun Richardson" highlight code

	type Unit = {
		step_current: ID;
		step_next: ID;
		id: ID;
		data: any;
	};

	type ID = string | number;

	class Line implements LineInterface {
		name: ID;
		unit: Unit;
		stations: Station[];
		steps: Step[];

		constructor({ unit, stations, steps, name }: Line) {
			this.name = name;
			this.unit = unit;
			this.stations = stations;
			this.steps = steps;
		}

		*process_line() {
			for (const step in this.steps) {
				yield this.steps[step].execute(this.unit, this.stations[step]);
			}
		}
	}

	const step1: Step = {
		step_current: 'begin',
		step_next: 'next step',
		execute: (u) => {
			if (!u.data) {
				console.log('unit has started emty');
				u.data = { beginning: 'a beginning data' };
			}
			return u;
		}
	};

	const step2: Step = {
		step_current: '',
		step_next: 'next step',
		execute: (u, s) => {
			u.data = s.data;
			return u;
		}
	};

	const station1: Station = {
		data: 'anydata',
		id: 'station1'
	};
	const station2: Station = {
		data: 'adding second station data',
		id: 'station2'
	};

	const u: Unit = {
		data: undefined,
		id: 'myid',
		step_current: 'begin',
		step_next: 'step2'
	};

	const my_line = new Line({
		name: 'my_line',
		stations: [station1, station2],
		steps: [step1, step2],
		unit: u
	});
	
	// just have to run to the store quick
	// back
	// rooooolllllerr coasssster
	/// ???
	
	

	//i just got a coffee.... no stress bud
   // its making sence with the "my_line" const
   


	// brain fuzzy. hangon
	// did 4 hour driving today. dont feel sharp. I had it earlier. now I lost it
	// basically, the stations are separate to the steps because you just have one "user" station with 1 user form
	// but you can add like 5 different types of users etc
	// and steps are separate, because each station can have many directions.
	// Ill get it back

	//give me a sec... to ask, and question?
	// i dont feel the step requires knowledge of next or previous steps... does the line not manage that?
	// line is just a container, a lisst of steps

	// yes, but why is it relevent what the next step is or the previous step, if the line container has that information?
	// a unit can go back and forward across the line, depending on info in the form
	// then if i press back, then it goes back to that step, and then looks at the line container to populate the new back step?
	// so it will then be looking to the line container then anyways?
	// yeah, only if we program a step.
	// a step is lile an "if" statement that we code. (if all data, goto my_next_step: else refresh())

	// all right, im intersted in seeing where you go with this

	// lololol
	// me too man

	//how will you define then the line?
	//line = new line(step1,step2, step3, complete)???
	// sortof. but yeah.
</script>
